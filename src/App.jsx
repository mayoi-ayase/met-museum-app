import { QueryClient, QueryClientProvider } from "react-query";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Paintings from "./components/Paintings";
import Search from "./components/Search";
import Header from "./components/Header";
import Home from "./components/Home";
import NotFound from "./components/NotFound";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const queryClient = new QueryClient();

  return (
    <>
      <BrowserRouter>
        <QueryClientProvider client={queryClient}>
          <Header></Header>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/index" element={<Home />} />
            <Route path="/paintings" element={<Paintings />} />
            <Route path="/search" element={<Search />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </QueryClientProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
