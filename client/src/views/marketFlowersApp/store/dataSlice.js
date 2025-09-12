import { createSlice } from "@reduxjs/toolkit";

const KEY = "dataStorage";

const load = () => {
  try {
    return JSON.parse(localStorage.getItem(KEY)) || [];
  } catch {
    return [];
  }
};

const save = (state) => {
  localStorage.setItem(KEY, JSON.stringify(state));
};

const initialState = load();

export const dataStorageSlice = createSlice({
  name: "dataStorage",
  initialState,
  reducers: {
    upsertOne(state, action) {
      const index = state.findIndex((b) => b.id === action.payload.id);
      if (index >= 0) {
        state[index] = action.payload;
      } else {
        state.push(action.payload);
      }
      save(state);
    },

    upsertMany(state, action) {
      const map = new Map(state.map((b) => [b.id, b]));
      action.payload.forEach((b) => map.set(b.id, b));
      const next = Array.from(map.values());
      save(next);
      return next;
    },

    removeById(state, action) {
      const next = state.filter((b) => b.id !== action.payload);
      save(next);
      return next;
    },

    clear() {
      save([]);
      return [];
    },
  },
});

export const { upsertOne, upsertMany, removeById, clear } =
  dataStorageSlice.actions;

export default dataStorageSlice.reducer;
