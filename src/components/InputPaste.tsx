import React, {useState} from "react";

function InputPaste(): JSX.Element {

    const [pasteText, setPasteText] = useState("");

    const onSubmitForm = async () => {
        //event.preventDefault();
        try {
            const body = {pasteText};
            console.log(body)
            const response = await fetch ("http://localhost:4000/pastes", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(body)
            });

            console.log(response);
            
        } catch (error) {
            console.log(error.message)
            
        }
    }

    return (
        <div> 
            <h1>Input Paste</h1>
            <form>
                <input 
                value = {pasteText}
                onChange = {event => setPasteText(event.target.value)}  
                />
                <button
                onClick = {onSubmitForm}>Save</button>
            </form>

        </div>
    )
};

export default InputPaste;