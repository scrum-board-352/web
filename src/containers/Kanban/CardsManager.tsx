import { createCard as createCardApi, updateCard } from "api/Card";
import CardModel from "models/Card";
import React, { useState } from "react";

let update: () => void;
let boardId: string;
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
  update();
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
  update();
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
  update();
}

function getCardsByColName(colName: string) {
  return cards.filter((card) => card.status === colName);
}

function getCurrentCardId() {
  return currentCardId;
}

const initCardsManager = {
  isDragging,
  getCurrentBoardId,
  getOriginColName,
  getCardsByColName,
  getCurrentCardId,
  getSelectedColName,
  setSelectedColName,
  setTargetColName,
  startDrag,
  endDrag,
};

export function getCardById(id: string) {
  return cards.find((card) => card.id === id);
}

export async function createCard(card: CardModel.CreateInfo) {
  const createdCard = await createCardApi(card);
  cards.push(createdCard);
  update();
}

export const CardsContext = React.createContext(initCardsManager);

type Props = {
  boardId: string;
  cards: CardModel.Info[];
  children: React.ReactNode;
};

export function CardsManager(props: Props) {
  const [cardsManager, setCardsManager] = useState(initCardsManager);
  update = () => {
    setCardsManager({ ...cardsManager });
  };
  cards = props.cards;
  boardId = props.boardId;
  return <CardsContext.Provider value={cardsManager}>{props.children}</CardsContext.Provider>;
}
