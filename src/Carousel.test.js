import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Carousel from './Carousel';

// Smoke
test('It renders without crashing', () => {
	render(<Carousel />);
});

// Snapshot
it('matches snapshot', function() {
	const { asFragment } = render(<Carousel title="Test Title" />);
	expect(asFragment()).toMatchSnapshot();
});

it('works when you click on the right arrow', function() {
	const { queryByTestId, queryByAltText } = render(<Carousel />);

	// expect the first image to show, but not the second
	expect(queryByAltText('Photo by Richard Pasquarella on Unsplash')).toBeInTheDocument();
	expect(queryByAltText('Photo by Pratik Patel on Unsplash')).not.toBeInTheDocument();

	// move forward in the carousel
	const rightArrow = queryByTestId('right-arrow');
	fireEvent.click(rightArrow);

	// expect the second image to show, but not the first
	expect(queryByAltText('Photo by Richard Pasquarella on Unsplash')).not.toBeInTheDocument();
	expect(queryByAltText('Photo by Pratik Patel on Unsplash')).toBeInTheDocument();
});

it('works when you click on the left arrow', () => {
	const { queryByTestId, queryByAltText } = render(<Carousel />);
	const rightArrow = queryByTestId('right-arrow');
	fireEvent.click(rightArrow);

	// Expect second image to show, and not the first
	expect(queryByAltText('Photo by Richard Pasquarella on Unsplash')).not.toBeInTheDocument();
	expect(queryByAltText('Photo by Pratik Patel on Unsplash')).toBeInTheDocument();

	const leftArrow = queryByTestId('left-arrow');
	fireEvent.click(leftArrow);

	// expect the first image to show, but not the second
	expect(queryByAltText('Photo by Richard Pasquarella on Unsplash')).toBeInTheDocument();
	expect(queryByAltText('Photo by Pratik Patel on Unsplash')).not.toBeInTheDocument();
});

it('hides left-arrow on first image and right-arrow on final image', () => {
	const { queryByTestId, queryByAltText, debug } = render(<Carousel />);
	let rightArrow = queryByTestId('right-arrow');
	let leftArrow = queryByTestId('left-arrow');

	// Left arrow should be hidden
	expect(rightArrow).toBeInTheDocument();
	expect(leftArrow).not.toBeInTheDocument();

	// next image
	fireEvent.click(rightArrow);
	// redifine arrows
	leftArrow = queryByTestId('left-arrow');
	rightArrow = queryByTestId('right-arrow');

	expect(rightArrow).toBeInTheDocument();
	expect(leftArrow).toBeInTheDocument();

	// final image
	fireEvent.click(rightArrow);

	// redifine arrows again
	leftArrow = queryByTestId('left-arrow');
	rightArrow = queryByTestId('right-arrow');

	// Right arrow should be hidden
	expect(leftArrow).toBeInTheDocument();
	expect(rightArrow).not.toBeInTheDocument();
});
