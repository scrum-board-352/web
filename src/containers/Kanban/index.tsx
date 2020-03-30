import Empty from "components/Empty";
import Loading from "components/Loading";
import LoadingButton from "components/LoadingButton";
import { message } from "components/MessageBox";
import Searchbar from "components/Searchbar";
import Select, { Option } from "components/Select";
import SettingButton from "components/SettingButton";
import { createBoard } from "graphql/Board";
import useLoading from "hooks/useLoading";
import BoardModel from "models/Board";
import CardModel from "models/Card";
import ProjectModel from "models/Project";
import React, { Fragment, useEffect, useState } from "react";
import ScrollBox from "react-responsive-scrollbox";
import { useHistory, useParams } from "react-router-dom";
import testBoardData from "utils/testBoardData";
import testCardData from "utils/testCardData";
import testProjectData from "utils/testProjectData";
import CardCol from "./CardCol";
import CardDetail from "./CardDetail";
import { CardsManager, getCardById } from "./CardsManager";
import style from "./style.module.css";

export default function Kanban() {
  const { projectId, iteration } = useParams();
  const history = useHistory();
  const initProject: ProjectModel.Info = {
    id: "",
    name: "",
    iteration: 0,
    createTime: "",
    creator: "",
    col: [],
    row: [],
  };
  const [project, setProject] = useState<ProjectModel.Info>(initProject);
  const [boardId, setBoardId] = useState<BoardModel.Info["id"]>("");
  const [boardIds, setBoardIds] = useState<Array<BoardModel.Info["id"]>>([]);
  const [cards, setCards] = useState<Array<CardModel.Info>>([]);
  const [noBoard, setNoBoard] = useState(false);
  const [loading, loadingOps] = useLoading();

  useEffect(() => {
    loadingOps(async () => {
      enum ErrorType {
        NotFound = "not found",
        NoBoard = "no board",
      }

      let project: ProjectModel.Info = initProject;
      let boardId: BoardModel.Info["id"] = "";
      let boardIds: Array<BoardModel.Info["id"]> = [];
      let cards: Array<CardModel.Info> = [];
      let noBoard = false;

      try {
        // TODO: fetch and check project.
        const projects = Object.values(testProjectData.info);
        const res = projects.find((p) => p.id === projectId);
        if (!res) {
          throw ErrorType.NotFound;
        }
        project = res;
        // TODO: get all boards.
        const boards = projectId === projects[0].id ? Object.values(testBoardData.info) : [];
        if (boards.length === 0) {
          throw ErrorType.NoBoard;
        }
        boardIds = boards.map((board) => board.id);
        if (!iteration) {
          history.replace(`${projectId}/${boards.length}`);
          return;
        }
        const iterationNum = Number(iteration);
        if (Number.isNaN(iterationNum) || !Number.isInteger(iterationNum)) {
          throw ErrorType.NotFound;
        }
        const board = boards[iterationNum - 1];
        if (!board) {
          throw ErrorType.NotFound;
        }
        boardId = board.id;
        // TODO: fetch cards.
        cards = projectId === projects[0].id ? testCardData.info.cards : [];
      } catch (err) {
        switch (err) {
          case ErrorType.NotFound:
            history.replace("/404");
            return;

          case ErrorType.NoBoard:
            noBoard = true;
            break;

          default:
            message({
              type: "error",
              title: "Unknown Error!",
              content: err.message,
            });
        }
      }
      setProject(project);
      setBoardIds(boardIds);
      setBoardId(boardId);
      setCards(cards);
      setNoBoard(noBoard);
    });
  }, [loadingOps, projectId, iteration, history]);

  const [showCardDetailFlag, setShowCardDetailFlag] = useState(false);
  const [cardDetail, setCardDetail] = useState<CardModel.Info>({
    id: "",
    boardId: "",
    createTime: "",
    title: "",
    status: "",
    founder: "",
  });

  function showCardDetail(cardId: string) {
    const cardDetail = getCardById(cardId);
    if (!cardDetail) {
      message({
        type: "error",
        title: "Invalid Card!",
        content: `No card with id ${cardId} found.`,
      });
      return;
    }
    setCardDetail(cardDetail);
    setShowCardDetailFlag(true);
  }

  const projectIterationOptions: Option[] = boardIds.map((_, i) => ({
    name: `iteration${i + 1}`,
    value: String(i + 1),
  }));

  const [createBoardLoading, createBoardLoadingOps] = useLoading();

  async function handleCreateBoardClick() {
    let newBoard: BoardModel.Info;
    try {
      newBoard = await createBoardLoadingOps(createBoard, {
        projectId: projectId as string,
      });
    } catch (err) {
      message({
        title: "Error!",
        type: "error",
        content: err.message,
      });
      return;
    }
    if (!newBoard.id) {
      message({
        title: "Create Board Failed!",
        type: "error",
      });
    } else {
      message({
        title: "Board Created!",
        type: "success",
      });
      history.replace(`${projectId}/1`);
    }
  }

  return (
    <div className={style.container}>
      {loading ? (
        <Loading />
      ) : (
        <Fragment>
          <div className={style.topbar}>
            <h1>{project.name}</h1>
            {noBoard ? null : (
              <>
                <Select
                  options={projectIterationOptions}
                  defaultValue={iteration ?? ""}
                  onChange={(iteration) => history.push(iteration)}
                />
                <Searchbar
                  className={style.topbar_search}
                  placeholder="Search card"
                  type="round"
                  color="#ddd"
                  size="1.5rem"
                />
                <SettingButton size="1.5rem" color="#ddd" hoverColor="var(--blue)" />
              </>
            )}
          </div>
          {noBoard ? (
            <Empty message="No board" size="10rem">
              <LoadingButton
                loading={createBoardLoading}
                text="Create Board"
                loadingText="Creating..."
                size="sm"
                onClick={handleCreateBoardClick}
              />
            </Empty>
          ) : (
            <ScrollBox className="scrollbar_thumb_green">
              <div className={style.card_col_container}>
                <CardsManager cards={cards}>
                  {project.col.map((col) => (
                    <CardCol key={col} colName={col} onClickCard={showCardDetail} />
                  ))}
                </CardsManager>
              </div>
            </ScrollBox>
          )}
          {cards.length ? (
            <CardDetail
              show={showCardDetailFlag}
              onHide={() => setShowCardDetailFlag(false)}
              card={cardDetail}
            />
          ) : null}
        </Fragment>
      )}
    </div>
  );
}
