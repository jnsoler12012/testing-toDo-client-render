

import { BrowserRouter, MemoryRouter, Route, Routes } from "react-router-dom";
import { render, fireEvent, screen, cleanup } from '@testing-library/react';
import { MainContext } from "../../../src/Infrastructure/App.jsx";
import { useState as useStateMock } from "react";
import Settings from "../../../src/UI/Pages/Settings.jsx";


describe("Login page", () => {
    const setState = jest.fn()

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
                        <Route index path="/v1" element={<Settings />} />
                    </Routes>
                </BrowserRouter>
            </MainContext.Provider>
            ,
            root
        );

        screen.debug()

        expect(setState).toHaveBeenCalledTimes(0)

        const divCreate = await screen.getByRole("show-settings")

        fireEvent.click(divCreate)

        console.log(setState);

        expect(setState).toHaveBeenCalledTimes(2)

    })
})
