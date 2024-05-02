import { forwardRef } from "react"
import { Link } from "react-router-dom";
import routes from "../../data/routes";
import { TextInput } from "../../styles/TextInput";
import useLocalStorage from "../../hooks/useLocalStorage";
import { CharacterNameLabel } from "../CharacterNameLabel";

const NameSelection = forwardRef((props, ref) => {

    const [name, setName] = useLocalStorage('character-creation-name', "")
    const [selectedContact, setSelectedContact] = useLocalStorage('character-creation-selected-contact', null)

    const handleNameChange = event => {
        const newValue = event.target.value.slice(0, 20)
        setName(newValue)
    }

    return (
        <section ref={ref}>
            <h2>Character Creation</h2>
            <h4>What is your name?</h4>
            <TextInput
                type="text"
                placeholder="Enter your name"
                value={name}
                onChange={handleNameChange}
        />
        
            <hr/>
            <br />
            <p>"Hey, <span style={{color: 'var(--faint-color)'}}>{name ? name : "_"}</span>. I know this probably isn't the position you wanted and that you're qualified to do a lot more than this, but I'd hate to find out you had to get on a shuttle back to Earth. My word goes a long way here at Vertico and it's not that bad when you consider the benefits."</p>
            <p>"Just put me down as a reference and you're definitely in. Let me know when you've sent the application and I'll make a phone call."</p>
            <br />
            <span style={{float: 'right', color: 'var(--faint-color)'}}>an email from <CharacterNameLabel character={selectedContact} /></span>
            <nav>
                <Link className="prev" to={routes.characterCreation + "3"}>BACK</Link>

                {name &&
                    <Link className="next" to={routes.characterCreation + "5"}>NEXT</Link>
                }
            </nav>
        </section>
    )
})

export default NameSelection;