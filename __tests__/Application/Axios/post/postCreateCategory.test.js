import { cleanup } from "@testing-library/react";
import { useState as useStateMock } from "react";


import * as axios from "axios";
import postCreateCategory from "../../../../src/Application/Axios/post/postCreateCategory.js";

// Mock out all top level functions, such as get, put, delete and post:
jest.mock("axios");


describe('Post createUser tests', () => {
    const setState = jest.fn()

    afterEach(() => {
        jest.clearAllMocks();
        cleanup();
    });

    beforeEach(() => {
        useStateMock.mockImplementation(init => [init, setState])
    })


    it('success creating user', async () => {
        const [mainContext, setMainContext] = useStateMock({
            reload: true,
            loading: false,
            services: {
                axios: axios
            }
        })
        axios.request.mockImplementation((e) => {
            console.log(e);
            if (e?.data?.name !== 'test')
                return Promise.resolve({
                    status: 400, data: {
                        response: 'error'
                    }
                })
            else
                return Promise.resolve({
                    status: 200, data: {
                        response: 'category created success'
                    }
                })
        });

        const context = { mainContext, setMainContext }
        const data = {
            name: 'test',
            color: 'password',
            idRequester: 2
        }

        const response = await postCreateCategory({
            data,
            context
        })

        expect(response?.data?.response).toBe('category created success')
        //console.log(response);
    });
});