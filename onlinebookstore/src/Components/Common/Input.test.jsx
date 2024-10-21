// import { describe, expect, it, vi } from "vitest";
// import Input from "./Input";
// import { fireEvent, render ,screen} from "@testing-library/react";
// import userEvent from "@testing-library/user-event";
// import { input } from "@testing-library/user-event/dist/cjs/event/input.js";


// describe('Input Component',()=>{

//     it('should renders with correct props',()=>{

//         render(<Input type="text" value="test" name="test name" id="testId" className="input-class" placeholder="Enter text"/>)

//         const inputElement= screen.getByPlaceholderText(/Enter text/i)

//         expect(inputElement).toBeInTheDocument();
//         expect(inputElement).toHaveValue('test');
//         expect(inputElement).toHaveAttribute('name','test name');
//         expect(inputElement).toHaveAttribute('id','testId');
//         expect(inputElement).toHaveAttribute('type','text');
//         expect(inputElement).toHaveClass('input-class');
//     })

//     it('should call onChange handler when value changes',()=>{

//         const handleChange= vi.fn();
//         render(<Input placeholder="Enter text" type="text" value="" onChange={handleChange}/>)

//         const inputElement=screen.getByRole('textbox')
//         fireEvent.change(inputElement, { target: { value: 'new value' } });

//         expect(handleChange).toHaveBeenCalledTimes(1)
//     })

//     it('should call onFocus handler when input is focused',()=>{
//         const handleFocus= vi.fn();
//         render(<Input placeholder="Enter text" type="text" value="" onFocus={handleFocus}/>)
//         const inputElement=screen.getByRole('textbox')
//         fireEvent.focus(inputElement);
//         expect(handleFocus).toHaveBeenCalledTimes(1)
//     })
// })