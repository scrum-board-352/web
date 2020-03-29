import Loading from "components/Loading";
import { message } from "components/MessageBox";
import Searchbar from "components/Searchbar";
import Select, { Option } from "components/Select";
import SettingButton from "components/SettingButton";
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
  const [project, setProject] = useState<ProjectModel.Info>({
    id: "",
    name: "",
    iteration: 0,
    createTime: "",
    creator: "",
    col: [],
    row: [],
  });
  const [boardId, setBoardId] = useState<BoardModel.Info["id"]>("");
  const [boardIds, setBoardIds] = useState<Array<BoardModel.Info["id"]>>([]);

  const projectIterationOptions: Option[] = boardIds.map((_, i) => ({
    name: `iteration${i + 1}`,
    value: String(i + 1),
  }));

  const [loading, setLoadig] = useState(true);

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

  useEffect(() => {
    (async () => {
      enum ErrorType {
        NotFound = "not found",
        NoBoard = "no board",
      }

      let project: ProjectModel.Info;
      let boardId: BoardModel.Info["id"];
      let boardIds: Array<BoardModel.Info["id"]>;

      try {
        // TODO: check project.
        project = testProjectData.info.shitMountain;
        if (projectId !== project.id) {
          throw ErrorType.NotFound;
        }
        // TODO: get all boards.
        const boards = Object.values(testBoardData.info);
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
      } catch (err) {
        if (err === ErrorType.NotFound) {
          history.replace("/404");
          return;
        }
        if (err === ErrorType.NoBoard) {
          // TODO: show create board.
          return;
        }
        message({
          type: "error",
          title: "Unknown Error!",
          content: err.message,
        });
        return;
      }
      setProject(project);
      setBoardIds(boardIds);
      setBoardId(boardId);
      setLoadig(false);
    })();
  }, [projectId, iteration, history]);

  return (
    <div className={style.container}>
      {loading ? (
        <Loading />
      ) : (
        <Fragment>
          <div className={style.topbar}>
            <h1>{project.name}</h1>
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
          </div>
          <ScrollBox className="scrollbar_thumb_green">
            <div className={style.card_col_container}>
              <CardsManager cards={testCardData.info.cards}>
                {project.col.map((col) => (
                  <CardCol key={col} colName={col} onClickCard={showCardDetail} />
                ))}
              </CardsManager>
            </div>
          </ScrollBox>
          <CardDetail show={showCardDetailFlag} onHide={() => setShowCardDetailFlag(false)} card={cardDetail} />
        </Fragment>
      )}
    </div>
  );
}
