import Endnote from "../Endnote"
import useEndnote from "../../hooks/useEndnote"
import Options from "./Options";
import { Button } from "../../styles/Button";

export default function OptionsLink() {

    const { isVisible: optionsVisible, toggleEndnote: toggleOptions } = useEndnote();

    return (
        <>
            <aside style={{zIndex: 999, top: '0'}}>
                <Button style={{fontSize: '80%'}} onClick={toggleOptions}>Options</Button>
            </aside>
            <Endnote isVisible={optionsVisible} onClose={toggleOptions} height="90vh">
                <Options />
            </Endnote>

        </>
    )
}