import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import { MemoryRouter } from "react-router-dom";
import App from './App'

import MenuBar from "./components/MenuBar";
import FrontPage from "./components/FrontPage";
import LogIn from "./components/LogIn";
import Register from "./components/Register";
import ClientPage from "./components/ClientPage";
import SideBarClient from "./components/SideBarClient";
import ClientInfo from "./components/ClientInfo";
import ClientPlan from "./components/ClientPlan";
import List from './components/List';
import TrainerPage from "./components/TrainerPage";
import SideBarTrainer from "./components/SideBarTrainer";
import SideBarManager from "./components/SideBarManager";
import BarChart from './components/BarChart';
import TrainingDetailModal from './components/TrainingDetailModal';
import ManagerPage from "./components/ManagerPage";

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

  test('Check if modify button is rendered', () => {
    const modifyButton = screen.getByText(/Modyfikuj dane/i);
    expect(modifyButton).toBeInTheDocument();
  });

});

//ClientPlan

describe('ClientPlan Component', () => {
  // test props
  const mockProps = {
    trainer_data: { trainer_id: 1 },
    selectItems: [{ clientId: 1, name: 'Tomasz', surname: 'Marchewka' }], 
    scrollId: 'clientPlan',
  };

  beforeEach(() => {
    render(
      <Router>
        <ClientPlan {...mockProps} />
      </Router>
    );
  });

  test('Check if the component renders properly', () => {
    expect(screen.getByText(/Plan ćwiczeń klienta/i)).toBeInTheDocument();
  });

  test('Check if select options are rendered', () => {
    const selectElement = screen.getByText(/Wybierz klienta/i);
    expect(selectElement).toBeInTheDocument();

    // Select a client from the options
    fireEvent.change(selectElement, { target: { value: '1' } });
  });

  test('Check if training plan form works', async () => {
    const dateInput = screen.getByLabelText(/Data/i);
    const timeInput = screen.getByLabelText(/Godzina/i);
    const addButton = screen.getByRole('button', { name: /Dodaj/i });

    fireEvent.change(dateInput, { target: { value: '2024-01-20' } });
    fireEvent.change(timeInput, { target: { value: '10:30' } });

    jest.spyOn(global, 'fetch').mockResolvedValueOnce({
      json: jest.fn().mockResolvedValueOnce({ status: 'success' }),
    });
  });
});

//SideBarTrainer
describe('SideBarTrainer.js', () => {

  beforeEach(() => {
    render(
      <Router>
        <SideBarTrainer />
      </Router>
    );
  });

  test('Check if trainer panel button is visible', () => {
    const nameText = screen.getByText(/Panel trenera/i);
    expect(nameText).toBeInTheDocument();
  });

  test('Check if client list button is visible', () => {
    const nameText = screen.getByText(/Lista klientów/i);
    expect(nameText).toBeInTheDocument();
  });

  test('Check if statistics client button is visible', () => {
    const nameText = screen.getByText(/Statystyki klientów/i);
    expect(nameText).toBeInTheDocument();
  });

  test('Check if clients trainings plan button is visible', () => {
    const nameText = screen.getByText(/Plany ćwiczeń klienta/i);
    expect(nameText).toBeInTheDocument();
  });

  test('Check if calendar button is visible', () => {
    const nameText = screen.getByText(/Kalendarz/i);
    expect(nameText).toBeInTheDocument();
  });

  test('Check if Sign out button is visible', () => {
    const nameText = screen.getByText(/Wyloguj się/i);
    expect(nameText).toBeInTheDocument();
  });
});

// // TrainerPage.js

// describe('TrainerPage.js', () => {

//   beforeEach(() => {
//     render(
//       <Router>
//         <TrainerPage />
//       </Router>
//     );
//   });

//   test('Check if welcome text is visible', () => {
//     const nameText = screen.getByText(/Witaj/i);
//     expect(nameText).toBeInTheDocument();
//   });

//   test('Check if trainer header is visible', () => {
//     const nameText = screen.getByText(/Panel trenera/i);
//     expect(nameText).toBeInTheDocument();
//   });

//   test('Check if clients list is visible', () => {
//     const nameText = screen.getByText(/Klienci/i);
//     expect(nameText).toBeInTheDocument();
//   });

//   test('Check if clients training plan is visible', () => {
//     const nameText = screen.getByText(/Plan ćwiczeń klienta/i);
//     expect(nameText).toBeInTheDocument();
//   });

//   test('Check if training plan component is visible', () => {
//     const nameText = screen.getByText(/Plan treningów/i);
//     expect(nameText).toBeInTheDocument();
//   });
// });


//BarChart

describe('BarChart Component', () => {

  beforeEach(() => {
    render(
      <Router>
        <BarChart />
      </Router>
    );
  });

  test('renders BarChart component', () => {
    const headerElement = screen.getByText(/Wybierz statystykę/i);
    expect(headerElement).toBeInTheDocument();
  });

  test('toggles stats when button is clicked', () => {
    const toggleButton = screen.getByRole('button', { name: /Pokaż statystyki dla jednej siłowni/i });
    expect(toggleButton).toBeInTheDocument();
  });
});


//SideBarManager
describe('SideBarManager.js', () => {

  beforeEach(() => {
    render(
      <Router>
        <SideBarManager />
      </Router>
    );
  });

  test('Check if manager panel button is visible', () => {
    const nameText = screen.getByText(/Panel menadżera/i);
    expect(nameText).toBeInTheDocument();
  });

  test('Check if gym list button is visible', () => {
    const nameText = screen.getByText(/Lista siłowni/i);
    expect(nameText).toBeInTheDocument();
  });

  test('Check if equipment list button is visible', () => {
    const nameText = screen.getByText(/Lista sprzętu/i);
    expect(nameText).toBeInTheDocument();
  });

  test('Check if trainer list button is visible', () => {
    const nameText = screen.getByText(/Lista trenerów/i);
    expect(nameText).toBeInTheDocument();
  });

  test('Check if trainer button is visible', () => {
    const nameText = screen.getByText(/Trenerzy/i);
    expect(nameText).toBeInTheDocument();
  });

  test('Check if gym button is visible', () => {
    const nameText = screen.getByText(/Siłownie/i);
    expect(nameText).toBeInTheDocument();
  });

  test('Check if Sign out button is visible', () => {
    const nameText = screen.getByText(/Wyloguj się/i);
    expect(nameText).toBeInTheDocument();
  });
});


// //TrainingDetail
// describe('TrainingDetailModal Component', () => {
//   beforeEach(() => {
//     // Przekazanie props do komponentu
//     const props = {
//       trainingDetails: {
//         training_id: 1,
//         // inne właściwości treningu
//       },
//     };

//     render(
//       <Router>
//         <TrainingDetailModal {...props} />
//       </Router>
//     );
//   });

//   test('renders TrainingDetailModal component with initial state', () => {
  
//     const titleElement = screen.getByText(/Szczegóły treningu/i);
//     expect(titleElement).toBeInTheDocument();

//     const closeButton = screen.getByRole('button', { name: /Close/i });
//     expect(closeButton).toBeInTheDocument();

//     const emptyStateElement = screen.getByText(/Brak szczegółów treningu/i);
//     expect(emptyStateElement).toBeInTheDocument();
//   });
// });

// describe('ManagerPage.js', () => {

//   beforeEach(() => {
//     render(
//       <Router>
//         <ManagerPage test="test"/>
//       </Router>
//     );
//   });

//   test('Check if welcome text is visible', () => {
//     const nameText = screen.getByText(/Witaj/i);
//     expect(nameText).toBeInTheDocument();
//   });

//   test('Check if manager header is visible', () => {
//     const nameText = screen.getByText(/Panel menadżera/i);
//     expect(nameText).toBeInTheDocument();
//   });

//   test('Check if gym list is visible', () => {
//     const nameText = screen.getByText(/Lista siłowni/i);
//     expect(nameText).toBeInTheDocument();
//   });

//   test('Check if gym statistics is visible', () => {
//     const nameText = screen.getByText(/Statystyki siłowni/i);
//     expect(nameText).toBeInTheDocument();
//   });

//   // test('Check if training plan component is visible', () => {
//   //   const nameText = screen.getByText(/Szczegóły/i);
//   //   expect(nameText).toBeInTheDocument();
//   // });
// });