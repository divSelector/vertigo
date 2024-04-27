import { Link } from 'react-router-dom';
import game from "../../data/game";
import routes from "../../data/routes";
import { useTheme } from "../../context/theme";
import { forwardRef, useEffect, useState } from 'react';
import Aura from '../../game/Aura';
import useLocalStorage from '../../hooks/useLocalStorage';
import { faker } from '@faker-js/faker';
import { CharacterNameLabel } from '../CharacterSheet';
import styled from 'styled-components';
import { DropdownInput } from '../../styles/DropdownInput';

const SocialContactPicker = forwardRef((props, ref) => {

    const [selectedOptionIndex, setSelectedOptionIndex] = useState('');
    const [selectedContact, setSelectedContact] = useState(null);

    const { hue, bright } = useTheme();

    const playerAura = new Aura(hue, bright)

    const [socialContactOptions, setSocialContactOptions] = useLocalStorage(
        'character-creation-random-social-contact-options',
        []
    );

    const getRandomBright = () => {
        return Math.floor(Math.random() * 20) + 1;
    }

    const getFakeSocialContact = () => {

        const socialContactHue = playerAura.getRandomComplementaryHueInRange();
        const aura = new Aura(socialContactHue, getRandomBright());

        const sexType = faker.person.sexType()


        return {
            name: faker.person.firstName(sexType) + " " + faker.person.lastName(),
            description: faker.person.bio(),
            gender: sexType,
            aura: aura,
            company: "Vertico Corporation",
            jobTitle: faker.person.jobTitle(),
        }
    }

    const handleOptionChange = (e) => {
        const selectedValue = e.target.value;
        setSelectedOptionIndex(selectedValue);

        const contact = socialContactOptions[selectedValue];
        setSelectedContact(contact);
    };

    useEffect(() => {
        if (!socialContactOptions.length) {
            let newSocialContactOptions = [];
            for (let i = 0; i < 4; i++) {
                const socialContact = getFakeSocialContact();
                newSocialContactOptions.push(socialContact);
            }
            setSocialContactOptions(newSocialContactOptions);
        }
    }, []);

    return (
        <section ref={ref}>
            <h4>Select a Social Contact</h4>
            <br />
            <p>You recently lost your job. An old friend from school works for Vertico Corporation and thinks they can get you a position.</p>
            <blockquote>You can see more information about characters in draggable popup boxes by clicking their names. The popups will close when you click outside of them.</blockquote>
            <br />

            <CenteredContainer>
                <GridContainer>
                    {socialContactOptions.map((contact, index) => (
                        <CharacterNameLabel key={index} character={contact} />
                    ))}
                </GridContainer>
            </CenteredContainer>
            <hr />
            <p>Select one of the above four NPCs as your social contact.</p>

            <DropdownInput onChange={handleOptionChange} value={selectedOptionIndex}>
                <option disabled value="">Who was your friend?</option>
                {socialContactOptions.map((contact, index) => (
                    <option value={index} key={index}>{contact.name}</option>
                ))}
            </DropdownInput>

            <nav>
                <Link className="prev" to={routes.characterCreation + "2"}>BACK</Link>

                {selectedContact &&
                    <Link className="next" to={routes.characterCreation + "4"}>NEXT</Link>
                }
            </nav>
        </section>
    )
})

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 10px 20px;
  justify-content: center;
  margin: 0 auto;
  margin-bottom: 0.5em;

  @media (max-width: 468px) {
    grid-template-columns: 1fr;
  }
`;

const CenteredContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const GridItem = styled.div`
  width: 100%;
`;


export default SocialContactPicker;

