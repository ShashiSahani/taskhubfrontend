import { BrowserRouter as Router} from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import Header from "./components/header/header";
import Footer from "./components/footer/footer";
import AppRoutes from "./components/routes/AppRoutes";


function App() {
  return (
    <Provider store={store}>
      <Router future={{v7_startTransition: true, v7_relativeSplatPath: true }}>
        <Header />
        <div className="main-content">
        <AppRoutes />
        </div>
        <Footer />
      </Router>
    </Provider>
  );
}

export default App;
