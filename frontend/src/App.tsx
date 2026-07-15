import { Routes, Route } from "react-router-dom";
import { Layout } from "./components/Layout";
import { HomePage } from "./pages/HomePage";
import { ExpertsPage } from "./pages/ExpertsPage";
import { StubPage } from "./pages/StubPage";

// Route table. Home + People (experts) are live; the rest render the restyled
// stub until a teammate builds them (follow the ExpertsPage pattern).
function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/experts" element={<ExpertsPage />} />
        <Route
          path="/knowledge"
          element={
            <StubPage
              title="Knowledge"
              description="Indexed docs, guides and runbooks — searchable across the org."
            />
          }
        />
        <Route
          path="/acronyms"
          element={
            <StubPage
              title="Acronyms"
              description="Look up an acronym → get its meaning and description."
            />
          }
        />
        <Route
          path="/prompts"
          element={
            <StubPage
              title="Prompts"
              description="Browse prompts by category, click to copy."
            />
          }
        />
        <Route
          path="/praise"
          element={
            <StubPage
              title="Praise"
              description="Recognition across the hub — give and receive kudos."
            />
          }
        />
        <Route
          path="/qna"
          element={
            <StubPage
              title="Q&A"
              description="Ask questions, get answers (AI draft if none yet)."
            />
          }
        />
        <Route
          path="/prompt-library"
          element={
            <StubPage
              title="Prompt Library"
              description="Curated, reusable prompts organized by task."
            />
          }
        />
        <Route
          path="/acronym-translator"
          element={
            <StubPage
              title="Acronym Translator"
              description="Translate acronyms across teams and languages."
            />
          }
        />
        <Route
          path="/settings"
          element={
            <StubPage
              title="Settings"
              description="Profile, appearance and notification preferences."
            />
          }
        />
      </Route>
    </Routes>
  );
}

export default App;
