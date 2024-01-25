import { render, fireEvent, screen, cleanup, getByText, getByPlaceholderText } from '@testing-library/react';
import { CardProfile } from "../../../../src/UI/Components/Cards";

describe('Card Profile information', () => {

    const dataUser = {
        createdAt: new Date(), email: 'tester@gmail.com', name: 'name tester',
    }

    it('should render good', async () => {
        const { getByDisplayValue } = render(
            <CardProfile user={dataUser} />
        )

        screen.debug()
        const textEmail = screen.getByText(dataUser.email)
        console.log(textEmail);

        expect(await screen.getByText(dataUser.email)).toBeInTheDocument()


    });
});