import auth from "api/base/auth";
import {
  createCard as createCardApi,
  removeCard as deleteCardApi,
  updateCard as updateCardApi,
} from "api/Card";
import CardModel from "models/Card";
import React, { useState } from "react";

let updateView: () => void;
let projectId: string;
let boardId: string;
let colNames: Array<string> = [];
let boardIds: Array<string> = [];
let cards: CardModel.Info[] = [];
let currentCardId = "";
let dragging = false;
let originColName = "";
let selectedColName = "";
let targetColName = "";

function isDragging() {
  return dragging;
}

function startDrag(cardId: string, colName: string) {
  dragging = true;
  currentCardId = cardId;
  originColName = colName;
  updateView();
}

function endDrag() {
  const movedCard = cards.find((card) => card.id === currentCardId);
  if (movedCard && targetColName) {
    movedCard.status = targetColName;
    updateCard(movedCard);
  }
  dragging = false;
  originColName = "";
  currentCardId = "";
  selectedColName = "";
  targetColName = "";
  updateView();
}

function getCurrentBoardId() {
  return boardId;
}

function setTargetColName(colName: string) {
  targetColName = colName;
}

function getOriginColName() {
  return originColName;
}

function getSelectedColName() {
  return selectedColName;
}

function setSelectedColName(colName: string) {
  selectedColName = colName;
  updateView();
}

function getCardsByColName(colName: string) {
  return cards.filter((card) => card.status === colName);
}

function getCurrentCardId() {
  return currentCardId;
}

async function updateCard(newCard: CardModel.UpdateInfo) {
  const updatedCard = await auth({ projectId }, updateCardApi, newCard);
  const oldCardIndex = cards.findIndex((c) => c.id === updatedCard.id);
  if (oldCardIndex >= 0) {
    if (newCard.boardId && newCard.boardId !== boardId) {
      // Moved card to different board, remove it from view.
      cards.splice(oldCardIndex, 1);
    } else {
      cards[oldCardIndex] = updatedCard;
    }
    updateView();
    return true;
  }
  return false;
}

async function deleteCard(card: CardModel.Info) {
  const res = await auth({ projectId }, deleteCardApi, { cardId: card.id });
  if (res.success) {
    const cardIndex = cards.findIndex((c) => c.id === card.id);
    if (cardIndex >= 0) {
      cards.splice(cardIndex, 1);
      updateView();
    }
  }
  return res;
}

function getCardById(id: string) {
  return cards.find((card) => card.id === id);
}

function getColNames() {
  return colNames;
}

function getBoardId() {
  return boardId;
}

function getBoardIds() {
  return boardIds;
}

async function createCard(card: CardModel.CreateInfo) {
  const createdCard = await auth({ projectId }, createCardApi, card);
  cards.push(createdCard);
  updateView();
}

const initCardsManager = {
  isDragging,
  getCurrentBoardId,
  getOriginColName,
  getCardsByColName,
  getCurrentCardId,
  getSelectedColName,
  getCardById,
  getColNames,
  getBoardId,
  getBoardIds,
  setSelectedColName,
  setTargetColName,
  startDrag,
  endDrag,
  createCard,
  updateCard,
  deleteCard,
};

export const CardsContext = React.createContext(initCardsManager);

type Props = {
  projectId: string;
  boardId: string;
  colNames: Array<string>;
  boardIds: Array<string>;
  cards: CardModel.Info[];
  children: React.ReactNode;
};

export function CardsManager(props: Props) {
  const [cardsManager, setCardsManager] = useState(initCardsManager);
  updateView = () => {
    setCardsManager({ ...cardsManager });
  };
  colNames = props.colNames;
  cards = props.cards;
  boardId = props.boardId;
  boardIds = props.boardIds;
  projectId = props.projectId;
  return <CardsContext.Provider value={cardsManager}>{props.children}</CardsContext.Provider>;
}
