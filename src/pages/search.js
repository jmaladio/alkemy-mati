import {useState} from 'react';
import {Link, Redirect} from 'react-router-dom';
import styled from 'styled-components/macro';
import {HeroCardContainer} from '../components/HeroCardContainer'
import  searchIcon  from '../assets/img/search-icon.svg';

const SearchContent = styled.div`
    width: 80%;
    margin: auto;
    padding: 20px 100px;
    background-color: #fff;
    margin-bottom: 3%;
    border-radius: 20px;
`;

const TitleSearch = styled.h1`
    font-size: 4em;
    font-weight: 700;
    text-align: center;
    margin-bottom: 3%;
`;

const TitleRules = styled.p`
    font-size: 2em;
    color: green;
    font-weight: 700;
    text-align: center;
    margin-bottom: 0;
`;

const RulesClarification = styled.p`
    display: block;
    font-size: 1em;
    color: red;
    font-weight: 700;
    text-align: center;
    margin-bottom: 3%;
`;

const AlignmentHeroes = styled.p`
    color: #000;
    display:inline-block;
    width: 40%;
    font-size: 2em;
    margin: 2% 0 5% 5%;
    text-align: center;
`;

const AlignmentHeroesData = styled.span`
    color: red;
    display: inline-block;
    font-size: 2em;
    vertical-align: middle;
`;

const Search = styled.form`
    text-align: center;
    width: 100%;
    margin-top: 4%;
`;

const SearchInput = styled.input`
    width: 20%;
`;

const SearchBtn = styled.input`
    vertical-align: top;
    width: 3%;
    background-image: url(${searchIcon});
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;
    background-color: #000;
    border: none;
    padding: 0.2%;
    cursor: pointer;
`;

const AllHeroes = styled.div`
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
    margin-bottom: 3%;
`;

const BackHomeBtn = styled.p`
    width: 30%;
    margin: auto;
    color: #000;
    padding: 10px;
    font-size: 2em;
    font-weight: 300;
    text-align: center;
    border: 0.1em solid #000;    
    border-radius: 10px;
    :hover {
        background-color: #000;
        color: #fff;
    }
`;

export const SearchHeroes = ({ urlToken, proxy, handleSelectedHeroe, setHeroesList, heroesList }) => {
    const isLogged = window.localStorage.getItem('isAuthorized');
    const [writtenHero, setWrittenHero] = useState(null);
    const [errorFetch, setErrorFetch] = useState('')
    const [errorNoData, setErrorNoData] = useState(false);
    const [neutralChoice, setNeutralChoice] = useState(false);

    if(isLogged === 'false' || !isLogged){
        return <Redirect to='/login' />
    }

    let heroes = JSON.parse(window.localStorage.getItem('myTeam'));

    const handleWrittenHero = hero => {
        setWrittenHero(hero.target.value)
    }
    
    const handleNeutralHeroSelection = () => {
        setNeutralChoice(true)
        setTimeout(() => { setNeutralChoice(false) }, 4000);
    }

    const handleErrorNoData = () => {
        setErrorNoData(true)
        setTimeout(() => { setErrorNoData(false) }, 4000);
    }

    const searchHero = async e => {
        
        try {
            const token = 1132055343928952;
            const urlToken = `https://superheroapi.com/api/${token}`
            const proxy = 'https://rocky-basin-57618.herokuapp.com/'
            let fetchHeroes = await fetch(`${proxy}${urlToken}/search/${writtenHero}`)
            let selectedHero = await fetchHeroes.json()
            console.log('fetch hero', selectedHero)
            if(selectedHero.response === 'success') {
                selectedHero = selectedHero.results;
                selectedHero.map(hero => {
                    return hero.isChosen = 'false'
                })
                return setHeroesList(selectedHero);
            } else {
                console.log('ERROR: ' + selectedHero.error);
                handleErrorNoData()
            }
        } catch(error) {
            console.log('ERROR: ', error);
            setErrorFetch(JSON.stringify(error))
        }
    }

    let goodHeroes = heroes.filter(hero => {
        return hero.biography.alignment === 'good'
    })

    let badHeroes = heroes.filter(hero => {
        return hero.biography.alignment === 'bad'
    })
    
    return (
        <>
                <SearchContent>

                    <TitleSearch>Choose your heroes!</TitleSearch>

                    <TitleRules>There should be 3 superheroes and 3 supervillains!</TitleRules>

                    { <RulesClarification style={{opacity: neutralChoice ? '1' : '0'}}>Neutral heroes does not count</RulesClarification> }
                    { <RulesClarification style={{opacity: errorNoData ? '1' : '0'}}> Character with given name not found </RulesClarification> }

                    <Search >
                        <SearchInput type='text' placeholder='Hero name...' onChange={handleWrittenHero} />
                        <SearchBtn type='button' value='' onClick={searchHero} />
                    </Search>

                    { errorFetch && <span> { errorFetch } </span> }

                    <AlignmentHeroes>SuperHeroes: <AlignmentHeroesData>{goodHeroes.length}/3</AlignmentHeroesData></AlignmentHeroes>
                    <AlignmentHeroes>SuperVillains: <AlignmentHeroesData>{badHeroes.length}/3</AlignmentHeroesData></AlignmentHeroes>

                    <AllHeroes>
                        <>
                        <HeroCardContainer 
                            heroesList={heroesList} 
                            handleSelectedHeroe={handleSelectedHeroe} 
                            goodHeroes={goodHeroes} 
                            badHeroes={badHeroes} 
                            handleNeutralHeroSelection={handleNeutralHeroSelection}
                        />
                        </>
                    </AllHeroes>

                    <Link to='/' style={{ textDecoration: 'none'}}><BackHomeBtn> Go back with your team! </BackHomeBtn></Link>

                </SearchContent>
        </>
    )
}