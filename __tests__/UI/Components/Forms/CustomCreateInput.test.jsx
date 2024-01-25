// CustomCreateInput.test.js

import React from 'react';
import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom';
import { default as CustomCreateInput } from '../../../../src/UI/Components/Forms/CustomCreateInput.jsx';
import { useState as useStateMock } from "react";

describe('CustomCreateInput', () => {
    const setState = jest.fn().mockReturnValueOnce(true)


    afterEach(() => {
        jest.clearAllMocks();
        cleanup();
    });

    beforeEach(() => {
        useStateMock.mockImplementation(init => [init, setState])
    })



    it('renders password input type', () => {
        render(<CustomCreateInput type="password" text="Password" id="password" errors={{}} register={() => { }} defaultValue="" />);

        const passwordInput = screen.getByRole('password-input');
        expect(passwordInput).toBeInTheDocument();
        expect(passwordInput).toHaveAttribute('type', 'password');
    });

    it('toggles input type between password and text on button click', () => {
        const { getByLabelText, getByRole } = render(<CustomCreateInput type="password" text="Password" id="password" errors={{}} register={() => { }} defaultValue="" />);

        const passwordInput = getByRole('password-input');
        const toggleButton = getByRole('password-button');


        console.log(toggleButton);
        // Initial type should be password
        expect(setState).toHaveBeenCalledTimes(0)


        // Click the button to toggle type
        fireEvent.click(toggleButton);

        expect(setState).toHaveBeenCalledTimes(1)

        const res = render(<CustomCreateInput type="password" text="Password" id="password" errors={{}} register={() => { }} defaultValue="" />);

    });
});