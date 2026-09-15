import { configureStore } from "@reduxjs/toolkit";

import blogReducer from "../features/blogs/blogSlice";
import serviceReducer from "../features/services/serviceSlice";
import contactReducer from "../features/contact/contactSlice";
import caseStudyReducer from "../features/caseStudies/caseStudySlice";

export const store = configureStore({
  reducer: {
    blogs: blogReducer,
    services: serviceReducer,
    contacts: contactReducer,
    caseStudies: caseStudyReducer,
  },
});