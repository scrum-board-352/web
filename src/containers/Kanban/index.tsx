import auth from "api/base/auth";
import { createBoard, removeBoard, selectBoardsByProjectId } from "api/Board";
import { selectCardsByBoardId } from "api/Card";
import { selectProjectById } from "api/Project";
import Empty from "components/Empty";
import Loading from "components/Loading";
import LoadingButton from "components/LoadingButton";
import { message, Message } from "components/MessageBox";
import ModalForm from "components/ModalForm";
import Searchbar from "components/Searchbar";
import Select, { Option } from "components/Select";
import SettingButton, { MenuItem } from "components/SettingButton";
import useLoading from "hooks/useLoading";
import useModalForm from "hooks/useModalForm";
import useQuery from "hooks/useQuery";
import BoardModel from "models/Board";
import CardModel from "models/Card";
import ProjectModel from "models/Project";
import React, { Fragment, useContext, useEffect, useState } from "react";
import ScrollBox from "react-responsive-scrollbox";
import { useHistory, useParams } from "react-router-dom";
import CardCol from "./CardCol";
import CardDetail from "./CardDetail";
import { CardsContext, CardsManager } from "./CardsManager";
import KanbanFormContext from "./KanbanFormContext";
import style from "./style.module.css";

type ProjectData = {
  project: ProjectModel.Info;
  noBoard: boolean;
  boardIds: string[];
  cards: CardModel.Info[];
};

const initProjectData: ProjectData = {
  project: {
    id: "",
    name: "",
    iteration: 0,
    createTime: "",
    creator: "",
    col: [],
    row: [],
  },
  noBoard: false,
  boardIds: [],
  cards: [],
};

export default function Kanban() {
  const { projectId, boardId } = useParams();
  const history = useHistory();
  const [projectData, setProjectData] = useState<ProjectData>(initProjectData);
  const { project, noBoard, boardIds, cards } = projectData;
  const [filteredCards, setFilteredCards] = useState<Array<CardModel.Info>>([]);
  const [loading, loadingOps] = useLoading(true);

  useEffect(() => {
    loadingOps(async () => {
      enum ErrorType {
        NotFound = "not found",
        NoBoard = "no board",
      }

      let project: ProjectModel.Info = initProjectData.project;
      let boards: Array<BoardModel.Info> = [];
      let boardIds: Array<BoardModel.Info["id"]> = [];
      let cards: Array<CardModel.Info> = [];
      let noBoard = false;

      try {
        if (!projectId) {
          throw ErrorType.NotFound;
        }
        const res: any = await Promise.all([
          auth({ projectId }, selectProjectById, { projectId }),
          auth({ projectId }, selectBoardsByProjectId, { projectId }),
          boardId ? auth({ projectId }, selectCardsByBoardId, { boardId }) : Promise.resolve([]),
        ]);
        project = res[0];
        if (!project.id) {
          throw ErrorType.NotFound;
        }
        boards = res[1];
        if (boards.length === 0) {
          throw ErrorType.NoBoard;
        }
        boardIds = boards.map((board) => board.id);
        if (!boardId) {
          history.replace(`${projectId}/${boardIds[boardIds.length - 1]}`);
          return;
        }
        if (!boardIds.includes(boardId)) {
          throw ErrorType.NotFound;
        }
        const board = boards.find((b) => b.id === boardId);
        if (!board) {
          throw ErrorType.NotFound;
        }
        cards = res[2];
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
      setProjectData({
        project,
        noBoard,
        boardIds,
        cards,
      });
    });
  }, [loadingOps, projectId, boardId]);

  useEffect(() => {
    setFilteredCards(cards);
  }, [cards]);

  function handleSearchCard(keyword: string) {
    setFilteredCards(cards.filter((c) => c.title.includes(keyword)));
  }

  const [showCardDetailFlag, setShowCardDetailFlag] = useState(false);
  const [cardDetail, setCardDetail] = useState<CardModel.Info>({
    id: "",
    number: 0,
    boardId: "",
    createTime: "",
    title: "",
    status: "",
    founder: "",
  });
  const cardId = useQuery().get("cardId");

  useEffect(() => {
    const queryCard = cards.find((card) => card.id === cardId);
    if (queryCard) {
      setCardDetail(queryCard);
      setShowCardDetailFlag(true);
    }
  }, [cards, cardId]);

  const cardsManager = useContext(CardsContext);

  function showCardDetail(cardId: string) {
    const cardDetail = cardsManager.getCardById(cardId);
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

  const projectIterationOptions: Option[] = boardIds.map((id, i) => ({
    name: `iteration${i + 1}`,
    value: id,
  }));

  const [createBoardLoading, createBoardLoadingOps] = useLoading();

  async function handleCreateBoard() {
    message({
      title: "Creating...",
      type: "info",
    });
    let newBoard: BoardModel.Info | null = null;
    try {
      newBoard = await createBoardLoadingOps(auth, { projectId }, createBoard, {
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
    if (newBoard && newBoard.id) {
      message({
        title: "Board Created!",
        type: "success",
      });
    } else {
      message({
        title: "Create Board Failed!",
        type: "error",
      });
    }
    return newBoard;
  }

  async function handleDeleteBoard() {
    if (!boardId) {
      return;
    }
    message({
      title: "Deleting...",
      type: "info",
    });
    const res = await auth({ projectId }, removeBoard, { boardId });
    const messageOption: Message = {
      title: "",
      type: "error",
      content: res.message,
    };
    if (res.success) {
      messageOption.title = "Delete Succeed!";
      messageOption.type = "success";
    } else {
      messageOption.title = "Delete Failed!";
      messageOption.type = "error";
    }
    message(messageOption);
    return res.success;
  }

  async function handleCreateBoardClick() {
    const newBoard = await handleCreateBoard();
    if (newBoard && newBoard.id) {
      history.replace(`${projectId}/${newBoard.id}`);
      setProjectData({ ...projectData, noBoard: false });
    }
  }

  const projectSettingMenu: Array<MenuItem> = [
    {
      label: "Add New Board",
      async onClick() {
        const newBoard = await handleCreateBoard();
        if (newBoard && newBoard.id) {
          history.push(newBoard.id);
        }
      },
    },
    {
      label: "Delete This Board",
      async onClick() {
        const userConfirm = window.confirm("WARNING! Do you really want to delete this board?");
        if (!userConfirm) {
          return;
        }
        const ok = await handleDeleteBoard();
        if (ok) {
          const boardIdIndex = boardIds.indexOf(boardId ?? "");
          if (boardIdIndex === -1) {
            return;
          }
          let nextBoardId: string;
          if (boardIds.length < 2) {
            history.push(`/dashboard/projects/${projectId}`);
            return;
          } else if (boardIds.length - 1 === boardIdIndex) {
            nextBoardId = boardIds[boardIdIndex - 1];
          } else {
            nextBoardId = boardIds[boardIdIndex + 1];
          }
          history.push(nextBoardId);
        }
      },
    },
    {
      label: "Project Setting",
      onClick() {
        alert("ok");
      },
    },
  ];

  const [modalFormProps, openModalForm] = useModalForm();

  return (
    <>
      <ModalForm {...modalFormProps} />
      <KanbanFormContext.Provider value={() => openModalForm}>
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
                      defaultValue={boardId ?? ""}
                      onChange={(id) => history.push(id)}
                    />
                    <Searchbar
                      className={style.topbar_search}
                      placeholder="Search Card..."
                      type="round"
                      color="#ddd"
                      size="1.5rem"
                      onSearch={handleSearchCard}
                    />
                    <SettingButton
                      size="1.5rem"
                      color="#ddd"
                      hoverColor="var(--blue)"
                      menuItems={projectSettingMenu}
                    />
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
                    <CardsManager
                      cards={filteredCards}
                      projectId={projectId ?? ""}
                      boardId={boardId ?? ""}>
                      {project.col.map((col) => (
                        <CardCol key={col} colName={col} onClickCard={showCardDetail} />
                      ))}
                    </CardsManager>
                  </div>
                </ScrollBox>
              )}
              <CardDetail
                show={showCardDetailFlag}
                onHide={() => setShowCardDetailFlag(false)}
                projectId={projectId ?? ""}
                card={cardDetail}
              />
            </Fragment>
          )}
        </div>
      </KanbanFormContext.Provider>
    </>
  );
}
