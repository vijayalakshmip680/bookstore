import Input from "./Input"
import Label from "./Label"

const InputForm=({wrapperClass,label='',erroMsg='',isErrormsg,...inputProperties})=>{

    return(
        <div className={wrapperClass}>
            {
                label && <Label htmlFor={inputProperties['id']} value={label}/>
            }
             <Input {...inputProperties}/>
             {
                isErrormsg &&  <p className="error-msg">{erroMsg}</p>
             }
        </div>
    )

}
export default InputForm