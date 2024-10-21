// import { describe, expect } from "vitest";
// import InputForm from "./InputForm";
// import { render ,screen} from "@testing-library/react";

// describe('InputForm Component',()=>{
//     it('renders label when provided',()=>{

//         render(<InputForm wrapperClass="form-group" label="Test Label" id="test-input"/>)

//         const label= screen.getByLabelText('Test Label')
//         expect(label).toBeInTheDocument();
//     })

//     it('does not render label when not provided',()=>{
//         render(<InputForm wrapperClass="form-group" id="test-input"/>)
//         const label=screen.queryByLabelText('Test Label')
//         expect(label).not.toBeInTheDocument()
//     })


//     it('renders input with provided properties',()=>{
//         render(<InputForm wrapperClass="form-group" id="test-input" type="text"/>)
//         const input=screen.getByRole('textbox')
//         expect(input).toBeInTheDocument()
//         expect(input).toHaveAttribute('id','test-input')
//         expect(input).toHaveAttribute('type','text')
//     })

//     it('render error message when isErrormsg is true',()=>{
//         render(<InputForm wrapperClass="form-group" erroMsg="Error Occured" isErrormsg={true}/>)

//         const errorMessage=screen.getByText('Error Occured')
//         expect(errorMessage).toBeInTheDocument()
//         expect(errorMessage).toHaveClass('error-msg')
//     })

//     it('does not render error message when isErrormsg is false',()=>{
//         render(<InputForm wrapperClass="form-group" erroMsg="Error Occured" isErrormsg={false}/>)

//         const errorMessage=screen.queryByText('Error Occured')
//         expect(errorMessage).not.toBeInTheDocument()
//     })

// })