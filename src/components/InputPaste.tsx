import React, {useState} from "react";

function InputPaste(): JSX.Element {

    const [pasteText, setPasteText] = useState("");
    const [pasteTitle, setPasteTitle] = useState("");

    const onSubmitForm = async () => {
        //event.preventDefault();
        try {
            const body = {pasteText, pasteTitle};
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
    };

    return (
        <div> 
            <div>
                <h1 className = "text-center mt-5">Input Paste</h1>
                {/* <form className = "d-flex mt-2"> */}
                <form>
                    <div>
                        <textarea className="form-control col-md-12" aria-label="With textarea" 
                            value = {pasteText}
                            placeholder = "paste text here"
                            onChange = {event => setPasteText(event.target.value)}
                        />
                    </div>
                    <div className= "d-flex">
                        <input 
                            type = "text"
                            className = "form-control col-md-6"
                            value = {pasteTitle}
                            placeholder = "optional - title of text here"
                            onChange = {event => setPasteTitle(event.target.value)}
                                
                        />
                        <button
                        onClick = {onSubmitForm}
                        className = "btn btn-success">Save</button>
                    </div>
                </form>
            </div>

        </div>
    )
};

export default InputPaste;