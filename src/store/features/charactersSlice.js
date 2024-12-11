import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchCharacters = createAsyncThunk(
  "characters/fetchCharacters",
  async ({ page, pageSize }) => {
    const response = await axios.get(
      `https://api.disneyapi.dev/character?page=${page}&pageSize=${pageSize}`
    );

    return {
      page,
      data: response.data.data,
      totalPages: response.data.info.totalPages,
    };
  }
);

const charactersSlice = createSlice({
  name: "characters",
  initialState: {
    characters: {},
    totalPages: 1,
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCharacters.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCharacters.fulfilled, (state, action) => {
        console.log(action.payload);

        const { page, data, totalPages } = action.payload;
        state.status = "succeeded";
        state.characters[page] = data;
        state.totalPages = totalPages;
      })
      .addCase(fetchCharacters.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default charactersSlice.reducer;
