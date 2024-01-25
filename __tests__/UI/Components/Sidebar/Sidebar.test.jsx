// Sidebar.test.js

import React, { useContext } from 'react';
import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { default as Sidebar } from '../../../../src/UI/Components/Sidebar/Sidebar.jsx';

import { useState as useStateMock } from "react";
import { MainContext } from '../../../../src/Infrastructure/App.jsx';

describe('Sidebar', () => {

    const setState = jest.fn()

    afterEach(() => {
        jest.clearAllMocks();
        cleanup();
    });

    beforeEach(() => {
        useStateMock.mockImplementation(init => [init, setState])
    })

    it('renders without errors', () => {
        const root = document.createElement('div');
        document.body.appendChild(root);

        const [main, setMain] = useStateMock({
            reload: true,
            loading: false,
            user: {
                token: null,
                info: {
                    createdAt: 'null', imageRef: 'null', email: 'testingabc', id: 'other', name: 'name', role: 'ADMIN', state: 'true'
                }
            },
            filter: {
                category: [],
                state: 'All'

            },
        })

        render(
            <MainContext.Provider value={[main, setMain]}>
                <BrowserRouter initialEntries={['/']}>
                    <Routes>
                        <Route index path="/v1" element={<Sidebar />} />
                    </Routes>
                </BrowserRouter>
            </MainContext.Provider>
            , root
        );

        // Check if the component renders without errors
        expect(screen.getByRole('side_bar_link_logout')).toBeInTheDocument();
    });

    // it('navigates to Dashboard on Dashboard link click', () => {
    //     const { getByText } = render(
    //         <Router>
    //             <Sidebar />
    //         </Router>
    //     );

    //     // Click the Dashboard link
    //     fireEvent.click(getByText('Dashboard'));

    //     // Check if the expected navigation occurred
    //     expect(window.location.pathname).toBe('/app/dashboard');
    // });

    // it('navigates to Settings on Settings link click', () => {
    //     const { getByText } = render(
    //         <Router>
    //             <Sidebar />
    //         </Router>
    //     );

    //     // Click the Settings link
    //     fireEvent.click(getByText('Settings'));

    //     // Check if the expected navigation occurred
    //     expect(window.location.pathname).toBe('/app/settings');
    // });

    // // Add more test cases for other links or functionalities if needed

    // it('logs out on Log out link click', () => {
    //     const { getByText } = render(
    //         <Router>
    //             <Sidebar />
    //         </Router>
    //     );

    //     // Click the Log out link
    //     fireEvent.click(getByText('Log out'));

    //     // Add assertions or expectations related to the log out functionality
    // });
});