import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import App from './App'

import MenuBar from "./components/MenuBar";
import FrontPage from "./components/FrontPage";
import LogIn from "./components/LogIn";
import Register from "./components/Register";
import ClientPage from "./components/ClientPage";
import SideBarClient from "./components/SideBarClient";
import ClientInfo from "./components/ClientInfo";

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

  // test('Check if username text is visible', () => {
  //   const usernameText = screen.getByText(/Nazwa użytkownika/i);
  //   expect(usernameText).toBeInTheDocument();
  // });

  test('Check if password is visible', () => {
    const passwordText = screen.getByText(/Hasło musi mieć 8-20 znaków, musi zawierać litery i liczby/i);
    expect(passwordText).toBeInTheDocument();
  });

  test('Check if the cancel button is in the document', () => {
    const cancelButton = screen.getByText(/Anuluj/i);
    expect(cancelButton).toBeInTheDocument();
  });

});

// SIGN IN
describe('Register.js', () => {

  beforeEach(() => {
    render(
      <Router>
        <Register />
      </Router>
    );
  });

  test('Check if name field is visible', () => {
    const nameText = screen.getByText(/Imię/i);
    expect(nameText).toBeInTheDocument();
  });

  test('Check if surname field is visible', () => {
    const surnameText = screen.getByText(/Nazwisko/i);
    expect(surnameText).toBeInTheDocument();
  });

  test('Check if phone number field is visible', () => {
    const phoneNumberText = screen.getByText(/Numer telefonu/i);
    expect(phoneNumberText).toBeInTheDocument();
  });

  test('Check if email field is visible', () => {
    const emailText = screen.getByText(/Adres Email/i);
    expect(emailText).toBeInTheDocument();
  });

  test('Check if password field is visible', () => {
    const passwordText = screen.getByText(/Podaj nowe hasło/i);
    expect(passwordText).toBeInTheDocument();
  });

  test('Check if password again field is visible', () => {
    const password2Text = screen.getByText(/Powtórz nowe hasło/i);
    expect(password2Text).toBeInTheDocument();
  });

  test('Check if age field is visible', () => {
    const age = screen.getByText(/Wiek/i);
    expect(age).toBeInTheDocument();
  });

  test('Check if weight field is visible', () => {
    const weight = screen.getByText(/Waga/i);
    expect(weight).toBeInTheDocument();
  });

  test('Check if height again field is visible', () => {
    const height = screen.getByText(/Wzrost/i);
    expect(height).toBeInTheDocument();
  });

  test('Check if weight field is visible', () => {
    const weight = screen.getByText(/Waga/i);
    expect(weight).toBeInTheDocument();
  });

  test('Check if the cancel button is in the document', () => {
    const cancelButton = screen.getByText(/Anuluj/i);
    expect(cancelButton).toBeInTheDocument();
  });

});

// ClientPage.js

describe('ClientPage.js', () => {

  beforeEach(() => {
    render(
      <Router>
        <ClientPage />
      </Router>
    );
  });

  test('Check if welcome text is visible', () => {
    const nameText = screen.getByText(/Witaj/i);
    expect(nameText).toBeInTheDocument();
  });

  test('Check if user header is visible', () => {
    const nameText = screen.getByText(/Panel użytkownika/i);
    expect(nameText).toBeInTheDocument();
  });

  test('Check if history training is visible', () => {
    const nameText = screen.getByText(/Sprawdź ćwiczenia/i);
    expect(nameText).toBeInTheDocument();
  });

  test('Check if training statistics is visible', () => {
    const nameText = screen.getByText(/Statystyki treningów/i);
    expect(nameText).toBeInTheDocument();
  });

  test('Check if training plan component is visible', () => {
    const nameText = screen.getByText(/Szczegóły/i);
    expect(nameText).toBeInTheDocument();
  });
});


//SideBarClient
describe('SideBarClient.js', () => {

  beforeEach(() => {
    render(
      <Router>
        <SideBarClient />
      </Router>
    );
  });

  test('Check if client panel button is visible', () => {
    const nameText = screen.getByText(/Panel klient/i);
    expect(nameText).toBeInTheDocument();
  });

  test('Check if History Training button is visible', () => {
    const nameText = screen.getByText(/Historia treningów/i);
    expect(nameText).toBeInTheDocument();
  });

  test('Check if statistics training button is visible', () => {
    const nameText = screen.getByText(/Statystyki treningów/i);
    expect(nameText).toBeInTheDocument();
  });

  test('Check if training plan button is visible', () => {
    const nameText = screen.getByText(/Plany ćwiczeń/i);
    expect(nameText).toBeInTheDocument();
  });

  test('Check if trainers button is visible', () => {
    const nameText = screen.getByText(/Trenerzy/i);
    expect(nameText).toBeInTheDocument();
  });

  test('Check if modify button is visible', () => {
    const nameText = screen.getByText(/Modyfikuj swoje dane/i);
    expect(nameText).toBeInTheDocument();
  });

  test('Check if Sign out button is visible', () => {
    const nameText = screen.getByText(/Wyloguj się/i);
    expect(nameText).toBeInTheDocument();
  });
});


//ClientInfo
describe('ClientInfo.js', () => {

  beforeEach(() => {
    render(
      <Router>
        <ClientInfo />
      </Router>
    );
  });

  test('Check if name field is visible', () => {
    const nameText = screen.getByText(/Imię/i);
    expect(nameText).toBeInTheDocument();
  });

  test('Check if surname field is visible', () => {
    const nameText = screen.getByText(/Nazwisko/i);
    expect(nameText).toBeInTheDocument();
  });

  test('Check if phone number field is visible', () => {
    const nameText = screen.getByText(/Numer telefonu/i);
    expect(nameText).toBeInTheDocument();
  });

  test('Check if email field is visible', () => {
    const nameText = screen.getByText(/Adres Email/i);
    expect(nameText).toBeInTheDocument();
  });

  test('Check if new password field is visible', () => {
    const nameText = screen.getByText(/Podaj nowe hasło/i);
    expect(nameText).toBeInTheDocument();
  });

  test('Check if new password again field is visible', () => {
    const nameText = screen.getByText(/Powtórz nowe hasło/i);
    expect(nameText).toBeInTheDocument();
  });

  test('Check if age field is visible', () => {
    const nameText = screen.getByText(/Wiek/i);
    expect(nameText).toBeInTheDocument();
  });

  test('Check if weight field is visible', () => {
    const nameText = screen.getByText(/Waga/i);
    expect(nameText).toBeInTheDocument();
  });

  test('Check if height field is visible', () => {
    const nameText = screen.getByText(/Wzrost/i);
    expect(nameText).toBeInTheDocument();
  });

});