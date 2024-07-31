"use client"
import React from 'react';
import ReactDOM from 'react-dom';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import Builder from '../Builder/page';

function MyApp() {
  return (
    <DndProvider backend={HTML5Backend}>
      <Builder/>
    </DndProvider>
  );
}

export default MyApp;
