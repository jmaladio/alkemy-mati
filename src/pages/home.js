import {useState} from 'react';
import {Link, Redirect} from 'react-router-dom';
import styled from 'styled-components/macro';
import Modal from 'react-modal';
// import  userDefaultIcon  from '../assets/img/userDefault.svg';

const HomeContent = styled.div`
    width: 80%;
    margin: auto;
    padding: 20px 100px;
    background-color: #fff;
    border-radius: 20px;
    margin-bottom: 3%;
`;

const TitleHome = styled.h1`
    font-size: 4em;
    font-weight: 700;
    text-align: center;
    margin-bottom: 3%;
`;

const TeamBox = styled.div`
    width:100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    padding: 50px;
`;

const Hero = styled.div`
    width: 20%;
    margin-bottom: 3%;
    display: flex;
    flex-direction: column;
    border: 0.8em solid #000;
    border-radius: 10px;
`;

const HeroImg = styled.img`
    width: 100%;
    max-height: 200px;
    margin: auto;
`;

const HeroName = styled.h3`
    text-align: center;
    font-size: 2em;
`;

const HeroPowerStats = styled.p`
    font-weight: 300;
    margin: 0.7em 0;
    margin-left: 15%;
`;

const DataHeroPowerstats = styled.span`
    color: red;
    font-weight: 700;
`;

const DeleteBox = styled.form`
    margin: 3% auto 5% auto;
`;

const DeleteBtn = styled.input`
    padding: 20px;
    font-size: 1em;
    background-color: #fff;
    border-radius: 10px;
    border: 1px solid #000;
    cursor: pointer;
    :hover {
        background-color: #000;
        color: #fff;
    }
`;

const AddHeroBtn = styled.p`
    width: 10%;
    font-size: 150px;
    padding: 10px;
    margin: 0 auto 5% auto;
    text-align: center;
    color: #000;
    border: 2px solid #000;
    border-radius: 10px;
    :hover {
        background-color: #000;
        color: #fff;
    }
`;

const TeamPowerstatsBox = styled.div`
    width:60%;
    margin:auto;
`;

const TeamPowerstats = styled.p`
    font-size: 2em;
`;

const DataTeamPowerstats = styled.span`
    font-size: 1.5em;
    color: red;
`;

const ModalBox = styled.div`
    width: 70%;
    margin: auto;
    display: flex;
    flex-direction: column;
`;

const HeroImgModal = styled.img`
    width: 100%;
`;

const HeroNameModal = styled.p`
    font-size: 2em;
    display: inline-block;
    margin: 0.2em 0 0.2em 0;

`;

const HeroDescriptionModal = styled.p`
    font-size: 2em;
    display: inline-block;
    margin: 0.5em 0 0.5em 0;
`;

const HeroDataModal = styled.span`
    font-size: 2em;
    color: red;
    display: inline-block;
    margin: 0.5em 0 0.5em 0;
`;

const CloseModal = styled.button`
    font-size: 2em;
    width: 20%;
    padding: 20px;
    margin: auto;
    margin: 5% auto;
    cursor: pointer;
    background-color: #fff;
    border: #000;
    border-radius: 10px;
    :hover {
        background-color: #000;
        color:#fff;
    }
`;

export const Home = ({ handleDeleteHero, heroesList, setHeroesList, team}) => {

    const isLogged = window.localStorage.getItem('isAuthorized');

    const [modalIsOpen, setModalIsOpen] = useState(false)
    const [chosenHeroModal, setChosenHeroModal] = useState(null);
    
    if(isLogged === 'false' || !isLogged){
        return <Redirect to='/login' />
    }

    const teamPowerstats = [...team];

    let TeamIntelligence = teamPowerstats.reduce((prev, curHero) => {
        let powerstats;
        if(curHero.powerstats.intelligence === 'null') {
            powerstats = curHero.powerstats.intelligence = 0
        }
        powerstats = Number(curHero.powerstats.intelligence)
        return prev + powerstats;
      }, 0);

      let TeamStrength = teamPowerstats.reduce((prev, curHero) => {
        let powerstats;
        if(curHero.powerstats.strength === 'null') {
            powerstats = curHero.powerstats.strength = 0
        }
        powerstats = Number(curHero.powerstats.strength)
        return prev + powerstats;
      }, 0);

      let TeamSpeed = teamPowerstats.reduce((prev, curHero) => {
        let powerstats;
        if(curHero.powerstats.speed === 'null') {
            powerstats = curHero.powerstats.speed = 0
        }
        powerstats = Number(curHero.powerstats.speed)
        return prev + powerstats;
      }, 0);

      let TeamDurability = teamPowerstats.reduce((prev, curHero) => {
        let powerstats;
        if(curHero.powerstats.durability === 'null') {
            powerstats = curHero.powerstats.durability = 0
        }
        powerstats = Number(curHero.powerstats.durability)
        return prev + powerstats;
      }, 0);

      let TeamPower = teamPowerstats.reduce((prev, curHero) => {
        let powerstats;
        if(curHero.powerstats.power === 'null') {
            powerstats = curHero.powerstats.power = 0
        }
        powerstats = Number(curHero.powerstats.power)
        return prev + powerstats;
      }, 0);

      let TeamCombat = teamPowerstats.reduce((prev, curHero) => {
        let powerstats;
        if(curHero.powerstats.combat === 'null') {
            powerstats = curHero.powerstats.combat = 0
        }
        powerstats = Number(curHero.powerstats.combat)
        return prev + powerstats;
      }, 0);

      let TeamHeight = teamPowerstats.reduce((prev, curHero) => {
        prev = parseInt(prev)
        let heightData = curHero.appearance.height[1];
        heightData = heightData.replace('cm', '')
        if(heightData === null) {
            heightData = 0
        }
        heightData = Number(heightData)
        let resultado = parseInt(prev + heightData / teamPowerstats.length);
        return `${resultado} cm`
      }, 0);

      let TeamWeight = teamPowerstats.reduce((prev, curHero) => {
        prev = parseInt(prev)
        let weightData = curHero.appearance.weight[1];
        weightData = weightData.replace('kg', '')
        if(weightData === null) {
            weightData = 0
        }
        weightData = Number(weightData)
        let resultado = parseInt(prev + weightData / teamPowerstats.length);
        return `${resultado} kg`
      }, 0);

    return (
        <>
                <HomeContent>

                <TitleHome>Your Team!</TitleHome>

                    <TeamBox>
                        {
                            team.map(hero => {
                                return(<>
                                    {
                                        hero.isChosen === 'true' &&
                                        <>
                                        <Hero key={hero.id}>
                                            <HeroImg src={hero.image.url} alt="Image of the Hero" onClick={() => {
                                                setModalIsOpen(true)
                                                setChosenHeroModal(hero)
                                                }
                                            } />
                                            <HeroName onClick={() => {
                                                setModalIsOpen(true)
                                                setChosenHeroModal(hero)
                                                }
                                            }> {hero.name} </HeroName>
                                            <HeroPowerStats> Intelligence:<DataHeroPowerstats> {hero.powerstats.intelligence === 'null' ? 0 : hero.powerstats.intelligence} </DataHeroPowerstats> </HeroPowerStats>
                                            <HeroPowerStats> Strength:<DataHeroPowerstats> {hero.powerstats.strength === 'null' ? 0 : hero.powerstats.strength} </DataHeroPowerstats> </HeroPowerStats>
                                            <HeroPowerStats> Speed:<DataHeroPowerstats> {hero.powerstats.speed === 'null' ? 0 : hero.powerstats.speed} </DataHeroPowerstats> </HeroPowerStats>
                                            <HeroPowerStats> Durability:<DataHeroPowerstats> {hero.powerstats.durability === 'null' ? 0 : hero.powerstats.durability} </DataHeroPowerstats> </HeroPowerStats>
                                            <HeroPowerStats> Power:<DataHeroPowerstats> {hero.powerstats.power === 'null' ? 0 : hero.powerstats.power} </DataHeroPowerstats> </HeroPowerStats>
                                            <HeroPowerStats> Combat:<DataHeroPowerstats> {hero.powerstats.combat === 'null' ? 0 : hero.powerstats.combat} </DataHeroPowerstats> </HeroPowerStats>
                                            <DeleteBox>
                                                <DeleteBtn type="button" value="Delete" onClick={() => handleDeleteHero(hero)} />
                                            </DeleteBox>
                                        </Hero>
                                    </>}
                                </>)
                            })
                        }
                            {
                                modalIsOpen &&
                                <Modal
                                isOpen={modalIsOpen} 
                                onRequestClose={() => setModalIsOpen(false)}
                                >
                                    <ModalBox>
                                        <HeroImgModal src={chosenHeroModal.image.url} alt='Hero Image' />
                                        <HeroNameModal>Hero Name: <HeroDataModal> {chosenHeroModal.name}</HeroDataModal></HeroNameModal>
                                        <HeroDescriptionModal>Nick Name: <HeroDataModal>{chosenHeroModal.biography.aliases} </HeroDataModal></HeroDescriptionModal>
                                        <HeroDescriptionModal>Height: <HeroDataModal> {chosenHeroModal.appearance.height[1]}  </HeroDataModal></HeroDescriptionModal>
                                        <HeroDescriptionModal>Weight: <HeroDataModal> {chosenHeroModal.appearance.weight[1]} </HeroDataModal></HeroDescriptionModal>
                                        <HeroDescriptionModal>Eyes Color: <HeroDataModal> {chosenHeroModal.appearance['eye-color']} </HeroDataModal></HeroDescriptionModal>
                                        <HeroDescriptionModal>Hair Color: <HeroDataModal> {chosenHeroModal.appearance['hair-color']} </HeroDataModal></HeroDescriptionModal>
                                        <HeroDescriptionModal>Job: <HeroDataModal> {chosenHeroModal.work.occupation} </HeroDataModal></HeroDescriptionModal>
                                        <HeroDescriptionModal>Alignment: <HeroDataModal> {chosenHeroModal.biography.alignment} </HeroDataModal></HeroDescriptionModal>
                                        <CloseModal onClick={() => setModalIsOpen(false)}>Close</CloseModal>
                                    </ModalBox>
                                </Modal>
                            }
                    </TeamBox>

                    {   JSON.parse(window.localStorage.getItem('myTeam')).length < 6 &&
                         <Link to='/search-heroes' style={{ textDecoration: 'none'}}><AddHeroBtn> + </AddHeroBtn></Link>
                    }

                    <TitleHome>Team Powerstats</TitleHome>

                    <TeamPowerstatsBox>
                        <TeamPowerstats> Intelligence: <DataTeamPowerstats> {TeamIntelligence} </DataTeamPowerstats> </TeamPowerstats>
                        <TeamPowerstats> Strength: <DataTeamPowerstats> {TeamStrength} </DataTeamPowerstats> </TeamPowerstats>
                        <TeamPowerstats> Speed: <DataTeamPowerstats> {TeamSpeed} </DataTeamPowerstats> </TeamPowerstats>
                        <TeamPowerstats> Durability: <DataTeamPowerstats> {TeamDurability} </DataTeamPowerstats> </TeamPowerstats>
                        <TeamPowerstats> Power: <DataTeamPowerstats> {TeamPower} </DataTeamPowerstats> </TeamPowerstats>
                        <TeamPowerstats> Combat: <DataTeamPowerstats> {TeamCombat} </DataTeamPowerstats> </TeamPowerstats>
                        <TeamPowerstats> Height: <DataTeamPowerstats> {TeamHeight} </DataTeamPowerstats> </TeamPowerstats>
                        <TeamPowerstats> Weight: <DataTeamPowerstats> {TeamWeight} </DataTeamPowerstats> </TeamPowerstats>
                    </TeamPowerstatsBox>
                </HomeContent>
        </>
    )
}