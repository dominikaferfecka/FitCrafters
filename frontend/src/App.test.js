import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import App from './App'

import MenuBar from "./components/MenuBar";
import FrontPage from "./components/FrontPage";
import LogIn from "./components/LogIn";

// MENU BAR
describe('MenuBar.js', () => {

  beforeEach(() => {
    render(
      <Router>
        <MenuBar />
      </Router>
    );
  });

  test('Check if the title is in the document', () => {
    const titleInput = screen.getByText(/FitCrafters/i);
    expect(titleInput).toBeInTheDocument();
  });

  test('Check if the login text is in the document', () => {
    const loginText = screen.getByText(/Zaloguj jako/i);
    expect(loginText).toBeInTheDocument();
  
  });

  test('Check if the login button for client is in the document', () => {
    const clientButton = screen.getByRole("button", { name: /Klient/i });
    expect(clientButton).toBeInTheDocument();
  });

  test('Check if the login button for trainer is in the document', () => {
    const trainerButton = screen.getByRole("button", { name: /Trener/i });
    expect(trainerButton).toBeInTheDocument();
  });

  test('Check if the login button for manager is in the document', () => {
    const managerButton = screen.getByRole("button", { name: /Menadżer/i });
    expect(managerButton).toBeInTheDocument();
  });

  
});

// FRONT PAGE

describe('FrontPage.js', () => {

  beforeEach(() => {
    render(
      <Router>
        <FrontPage />
      </Router>
    );
  });

  test('Check if MenuBar is visible', () => {
    const loginText = screen.getByText(/Zaloguj jako/i);
    expect(loginText).toBeInTheDocument();
  });

  test('Check if header with mission is visible', () => {
    const missionText = screen.getByText(/Witaj na FitCrafters - Miejscu, gdzie Kształtujesz Siłę!/i);
    expect(missionText).toBeInTheDocument();
  });

  test('Check if description with mission is visible', () => {
    const descriptionText = screen.getByText(/Jesteśmy niezmiernie podekscytowani, że znalazłeś drogę do FitCrafters/i);
    expect(descriptionText).toBeInTheDocument();
  });

});

// LOGIN

describe('LogIn.js', () => {

  beforeEach(() => {
    render(
      <Router>
        <LogIn />
      </Router>
    );
  });

  test('Check if login title is visible', () => {
    const loginText = screen.getByText(/Zaloguj się jako/i);
    expect(loginText).toBeInTheDocument();
  });

  test('Check if username text is visible', () => {
    const usernameText = screen.getByText(/Nazwa użytkownika/i);
    expect(usernameText).toBeInTheDocument();
  });

  test('Check if password is visible', () => {
    const passwordText = screen.getByText(/Hasło/i);
    expect(passwordText).toBeInTheDocument();
  });

});