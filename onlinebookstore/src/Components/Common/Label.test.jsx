// import { describe, expect, it } from "vitest";
// import Label from "./Label";
// import { render , screen} from "@testing-library/react";

// describe('',()=>{
//     it('renders label with correct text and htmlFor attribute', () => {
//         render(<Label htmlFor="test-input" value="Test" />);
//         const label = screen.getByText('Test');
//         expect(label).toBeInTheDocument();
//     });
//     it('does not render label when value is empty', () => {
//         render(<Label htmlFor="test-input" value="" />);
//         const label = screen.queryByText('Test Label');
//         expect(label).not.toBeInTheDocument();
//     });
// })