import { render, fireEvent } from '@testing-library/react';
import Card from './Card';

test('It renders without crashing', () => {
	render(<Card />);
});

it('matches snapshot', function() {
	const { asFragment } = render(<Card caption="Test Shell" cardNum="1" totalNum="1" src="./image1.jpg" />);
	expect(asFragment()).toMatchSnapshot();
});
