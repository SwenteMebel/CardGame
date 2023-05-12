# CardGame
Kaart spel 

Eindopdracht voor de CardGame. 

1. U hebt als het goed is uw spel al herschreven en worden de kaartjes via de fetch() API binnengehaald. U gaat het spel nu voorzien van nieuwe functies en logica waardoor het echt een spel wordt. De gekozen kaartjes moeten getoond worden en als er een match is, moeten deze uit het spel genomen worden. Is dit niet het   geval, dan moeten ze weer omgedraaid worden en moet de speler de volgende twee kaartjes kunnen omdraaien.

2. In een tekstveld moet bijgehouden worden hoe vaak er een poging is ondernomen, hoe vaak de poging succesvol was en optioneel – voor de dare devils – de verstreken tijd in minuten en seconden.

3. U moet nu heel logisch en helder gaan denken, misschien dingen in een flow chart op papier gaan zetten omdat u stap voor stap moet gaan vertellen hoe het spel werkt en reageert. U moet alle func33ties van het spel verdelen in kleine logische functies die uitgevoerd worden op het juiste moment. Denk aan                onClickCard(), evaluateMatch(), keepScore(), nextMove(), resetGame() etc. Ook moet u naar eigen inzicht const en let gebruiken om waarden in op te slaan. U hebt een let nodig om de aangeklikte kaartjes in op te slaan, om ze vervolgens te kunnen evalueren, u moet het aantal weggespeelde sets in een let bijhouden, en het  aantal pogingen.

4. Wat u het beste kunt doen, is het werken met addEventListener() op het Field (het hele speelveld met de kaartjes), die u met removeEventListener() verwijdert als iemand op twee kaartjes heeft geklikt, zodat tijdens het bekijken van de omgedraaide kaartjes de gebruiker niet op nog meer kaartjes kan klikken. Er mogen    er op enig moment maar twee omgedraaid zijn. Pas als de kaartjes teruggedraaid zijn, mag de gebruiker weer klikken en moet u dus de event listener weer toepassen. Dit is echter op verschillende manieren op te lossen.

5. U moet pauzes inlassen omdat de speler even de tijd moet krijgen de omgedraaide kaartjes te bekijken vóór ze teruggedraaid óf weggenomen worden. Bestudeer de JavaScript method setTimeout() om de pauzes in te kunnen lassen, bijvoorbeeld om de kaartjes weer terug te draaien en verder te kunnen. Zoek naar het onderwerp    js_timing en js settimeout op w3schools. Gebruik deze website en deze.

6. Als extra uitdaging kunt u een timer bouwen met behulp van JavaScript. Hier zijn online voorbeelden van te vinden: Zie bijvoorbeeld w3schools 'timing clock'.

7. Bestudeer de JavaScript methods setInterval() en clearInterval() om daarmee een timer te kunnen bouwen. Bekijk o.a. w3schools 'setInterval'.

8. Bestudeer vooral de voorbeelden met de named functions en clearInterval() om de timer te pauzeren.

9. Als de speler op een kaartje klikt, wordt ook het bijbehorende geluid afgespeeld. Kinderen vinden het geweldig! U vindt de geluiden in de map snd.

10. De speler moet zijn naam invoeren via een prompt. De naam wordt opgeslagen in de localStorage. Als het spel opnieuw wordt geopend moet de speler met een alert() welkom geheten worden. Deze data komt uit de local storage. Extra uitdaging: sla de high scores op in de localStorage en toon die na elk spel. Echt een     lastige omdat er drie levels zijn. Kunt u die tonen met een pop-upvenster?


