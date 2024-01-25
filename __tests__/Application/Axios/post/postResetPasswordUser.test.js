import { cleanup } from "@testing-library/react";
import { useState as useStateMock } from "react";


import * as axios from "axios";
import postCreateCategory from "../../../../src/Application/Axios/post/postCreateCategory.js";

// Mock out all top level functions, such as get, put, delete and post:
jest.mock("axios");


describe('Reset password', () => {
    const setState = jest.fn()

    afterEach(() => {
        jest.clearAllMocks();
        cleanup();
    });

    beforeEach(() => {
        useStateMock.mockImplementation(init => [init, setState])
    })


    it('main axios petitions should redirect good', async () => {
        const [mainContext, setMainContext] = useStateMock({
            reload: true,
            loading: false,
            services: {
                axios: axios
            }
        })
        axios.request.mockImplementation((e) => {
            console.log(e);

            return Promise.resolve({
                status: 200, data: {
                    response: 'Resseted password success'
                }
            })
        });

        const context = { mainContext, setMainContext }
        const data = {
            email: 'test@gmail.com',
            password: 'password'
        }

        const response = await postCreateCategory({
            data,
            context
        })

        expect(response?.data?.response).toBe('Resseted password success')
        //console.log(response);
    });
});