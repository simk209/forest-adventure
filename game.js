const rl = require('readline-sync');

const char = {
    companion: [false, 'alone'],
}

function startGame() {
    console.log('starting game');
    
    // ask for user's name
    char.name = rl.question('\nWhat is your name? ')
    console.log(`\nHello ${char.name}. The woods have called to you for some time now. Today you answer their call. `)
    
    offerCompanion()   
}

function displayTextInSegments(text) {
    const sentenceRegex = /[^.!?]*[.!?]/g; // Regular expression to match sentences
    let match;
    while ((match = sentenceRegex.exec(text)) !== null) {
        console.log(match[0]);
        rl.question('...'); // Wait for user input to proceed to the next segment
    }
}

const offerCompanion = () =>{ 
    const friend = rl.question(`\nNow then, Do you go it alone, or do you choose you bring a companion with you on what could be a perilous journey? \nSelect 1 for a companion, or 2 to go alone `)
    console.log('~~~')

    if (friend === '1'){
        char.companion = [true,'with Marvin']
        // console.log(`\nMeet Marvin, a beautiful pug. He's wise, but not much of a fighter--\nActually, he has asthma and he might just slow you down`)
        const marvinInfo = `Meet Marvin, a beautiful pug. He's wise, but not much of a fighter--Actually, he has asthma and he might just slow you down.`;
        displayTextInSegments(marvinInfo);
    }
    choosePath()
}

// add a little shakehand thing that doesnt really matter?

const choosePath = () => {
    
    // console.log(`\nYou go to the woods ${char.companion[1]}. You take a moment just to take everything in. You can see smoke to your left, and hear running water to your right. \nThere are two paths before you. The path to the left is jagged and unfamiliar. Comparitively, the path to the right is well trodden.`)
    const introStory = `You go to the woods ${char.companion[1]}. You take a moment just to take everything in. You can see smoke to your left, and hear running water to your right. There are two paths before you. The path to the left is jagged and unfamiliar. Comparitively, the path to the right is well trodden.`;
    displayTextInSegments(introStory);
    const path = rl.question(`\nSelect 1 to go left, or 2 to go right `)
    console.log('~~~')
   
    if (path === '1' && char.companion[0]){
        console.log(`\nMarvin whines, and pulls you away from the path. You decide to go right instead`)
        console.log('~~~')
        findBrook()
    }
    else if (path === '1'){
        findCampfire()
    }
    else findBrook()
}


const findBrook = () =>{
    // console.log(`\nYou see a babbling brook. There are some shiny, jagged stones, and some rougher looking stones throughout the brook. \nBeyond the brook lies a beautiful meadow. The grass looks soft and the daises and bluebells are in bloom. You feel drawn to it.`) 
    const brookInfo =   `You see a babbling brook. There are some shiny, jagged stones, and some rougher looking stones throughout the brook. \nBeyond the brook lies a beautiful meadow. The grass looks soft and the daises and bluebells are in bloom. You feel drawn to it.`
    displayTextInSegments(brookInfo)
    if (char.companion[0]){
        const marvinBrookWhine = (`\nMarvin, on the other hand, steers clear of the brook. He does not look fearful, but he's an older dog, and has no business hopping over stones.`)
        displayTextInSegments(marvinBrookWhine)
        const crossAlone = rl.question(`\nDo you cross over the brook without Marvin, leaving him behind? Or do you stick beside him, despite the meadow beckoning you? \nSelect 1 to cross alone or 2 to stay with Marvin`)
        console.log('~~~')

        if (crossAlone === '1') brookEnd('bad')
        else brookEnd('good')
    }
    else{
        // question if they want to cross? maybe crossing alone will lead to unearthing a note someone else left (it gets better or soemthing), but finding it with companion leads to you leaving the note
        const cross = rl.question(`\nDo you attempt to cross the brook? Or is it time to go back home? Select 1 to cross or 2 to go back home`)
        console.log('~~~')

        if (cross === '1') brookEnd('good')
        else goHome('early')
    }
}

const goHome = (str) => {
    if (str === 'early'){
        const earlyEnd = `\nYou return home, safe and sound, but that feeling inside of you remains unfulfilled. You can't shake the feeling that there's something waiting for you in that forest.`
        displayTextInSegments(earlyEnd)
    } 
    // else console.log(`You return home, this time with your trusty companion. Your heart feels lighter, and even as the sun sets, you know there are brighter days ahead for the both of you.`)
    console.log(`\nfin\n Rerun file to start again`)
}

const findCampfire = () =>{
    const story = `You make your way through the trees until you get to a small clearing. \nThere's a fire pit, but you don't see anyone around. You take a step back -- right into someone. Unfortunately, they saw you before you saw them. fin\n Rerun file to start again`
    // console.log(`You make your way through the trees until you get to a small clearing. \nThere's a fire pit, but you don't see anyone around. \nSomething doesn't feel right...`)
    // console.log(`You take a step back -- right into someone.`)
    // console.log(`Unfortunately, they saw you before you saw them.`)
    // console.log(`fin\n Rerun file to start again`)
    displayTextInSegments(story)
}

const brookEnd = (str) => {
    // crossing alone (bad end) - left marvin
    if (str === 'bad'){
        const story = `You start crossing the brook alone. \nYou're more nimble than you look! But the water starts to change as you travel through, and you lose your footing. \nYou fall into the brook, and Marvin whines as you are swept away. \nYour heart feels heavier than ever, and your body feels like lead. fin\n Rerun file to start again`
        // console.log(`You start crossing the brook alone. \nYou're more nimble than you look! But the water starts to change as you travel through, and you lose your footing. \nYou fall into the brook, and Marvin whines as you are swept away. \nYour heart feels heavier than ever, and your body feels like lead.`)
        // console.log(`fin\n Rerun file to start again`)
        displayTextInSegments(story)
        return
    }

    // if you cross and never picked a companion
    if (!char.companion[0]){
        const story = `\nYou start crossing the brook. You're more nimble than you look! \nThe water seems to have slowed, and the meadow is bright. \nYou make it to the other side safely, and embrace the meadow and let it envelop you. \nYou notice a patch of upturned grass besides you - there's a notebook underneath. You read out the single page in the book.`
        displayTextInSegments(story)
    }

    // if you have a companion and chose the good end (stick by him)
    else if (str === 'good' && char.companion[0]){
        const story = `You signal Marvin to turn back home, and he looks relieved. \nWith a hollow heart, you start making your way back out of the forest with him. \nBut after a few steps, you feel something tugging at your leg. \nIt's Marvin, and his demeanor has changed. \nHe looks at you with an air of understanding, and beckons you towards the brook again. You nod at Marvin, feeling hopeful for the first time in a long time. \nBoth of you stand at the edge of the brook, but this time Marvin is in your arms. The water seems to have slowed, and the meadow feels greener and brighter. \nYou both make it to the other side safely, and you let the meadow envelop you. Out of the corner of your eye, you see a notebook- All but one page has been ripped out, and there's a stub of a pencil inside of it. Feeling the warmth of your friend at your feet and the sun on your face, your heart feels lighter. You pick up the pencil.`
        // console.log(`You signal Marvin to turn back home, and he looks relieved. \nWith a hollow heart, you start making your way back out of the forest with him. \nBut after a few steps, you feel something tugging at your leg. \nIt's Marvin, and his demeanor has changed. \nHe looks at you with an air of understanding, and beckons you towards the brook again.`)
        // console.log(`You nod at Marvin, feeling hopeful for the first time in a long time. \nBoth of you stand at the edge of the brook, but this time Marvin is in your arms.`)
        // console.log('The water seems to have slowed, and the meadow feels greener and brighter. \nYou both make it to the other side safely, and you let the meadow envelop you')
        // console.log(`Out of the corner of your eye, you see a notebook- All but one page has been ripped out, and there's a stub of a pencil inside of it.`)
        // console.log(`Feeling the warmth of your friend at your feet and the sun on your face, your heart feels lighter. You pick up the pencil.`)
        displayTextInSegments(story)
    }

    // the note
    const reset = "\x1b[0m"
    const italics = '\u001b[3m'
    const purple = "\x1b[35m";
    console.log(purple + italics + 'It gets better.' + reset)



}

startGame();
