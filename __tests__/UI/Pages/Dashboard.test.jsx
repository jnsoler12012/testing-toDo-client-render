

import { BrowserRouter, MemoryRouter, Route, Routes } from "react-router-dom";
import { render, fireEvent, screen, cleanup } from '@testing-library/react';
import { MainContext } from "../../../src/Infrastructure/App.jsx";
import { useState as useStateMock } from "react";
import { default as Login } from "../../../src/UI/Pages/Login.jsx";
import Dashboard from "../../../src/UI/Pages/Dashboard.jsx";


describe("Login page", () => {
    const setState = () => true

    afterEach(() => {
        jest.clearAllMocks();
        cleanup();
    });

    beforeEach(() => {
        useStateMock.mockImplementation(init => [init, setState])
    })

    it("should display Login main elements correctly", async () => {

        const root = document.createElement('div');
        document.body.appendChild(root);

        const [main, setMain] = useStateMock({
            reload: true,
            loading: false,
            user: {
                token: null,
                info: null
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
                        <Route index path="/v1" element={<Dashboard />} />
                    </Routes>
                </BrowserRouter>
            </MainContext.Provider>
            ,
            root
        );

        const divCreate = await screen.getByRole("add-new-task")

        fireEvent.click(divCreate)

        expect(await screen.getByRole("add-new-task")).toBeInTheDocument()


    })
})
