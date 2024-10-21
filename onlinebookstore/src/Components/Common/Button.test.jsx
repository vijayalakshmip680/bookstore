// import { describe,expect,it, vi } from "vitest";
// import { render,screen } from "@testing-library/react";
// import Button from './Button'


// describe('Button Component', () => {
//     it('renders with correct props', () => {
//         render(<Button type="button" className="btn-class" value="Submit" />);
//         const button = screen.getByRole('button', { name: /Submit/i });
//         expect(button).toBeInTheDocument();
//         expect(button).toHaveClass('btn-class');
//         expect(button).toHaveAttribute('type', 'button');
//     });


//     it('calls onClick handler when clicked', () => {
//         const handleClick = vi.fn();
//         render(<Button type="button" className="btn" value="Submit" onClick={handleClick} />);
//         const buttonElement = screen.getByText(/Submit/i);
//         buttonElement.click();
//         expect(handleClick).toHaveBeenCalled();
//     });
// });
