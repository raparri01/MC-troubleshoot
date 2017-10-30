/**
 * Created by robertaparri on 6/29/17.
 */
'use strict';

process.env.DEBUG = 'actions-on-google:*';

const App = require('actions-on-google').ApiAiApp;

const DEFAULT_WELCOME_INTENT = 'input.welcome';
const TEST_ACTION = 'test';
const TEST_TWO_ACTION = 'test_two';
const DEFAULT_FALLBACK_INTENT_ACTION = 'default_fallback_intent';
const HELP_ACTION = 'help';
const HELP_2_ACTION = 'help_2';
const HELP_3_ACTION = 'help_3';
const BEGIN_TROUBLESHOOTING_ACTION = 'begin_troubleshooting';
const LOG_TICKET_ACTION = 'log_ticket';
const LOG_TICKET_NAME_ACTION = 'log_ticket_name';
const LOG_TICKET_COMPUTER_ACTION = 'log_ticket_computer';
const LOG_TICKET_DESCRIPTION_ACTION = 'log_ticket_description';
const TROUBLESHOOT_ACTION = 'troubleshoot';
const TROUBLESHOOT_MOODLE_LOGIN = 'troubleshoot_moodle_login';
const TROUBLESHOOT_MOODLE_LOGIN_YES = 'troubleshoot_moodle_login_yes';
const TROUBLESHOOT_MOODLE_LOGIN_NO = 'troubleshoot_moodle_login_no';
const TROUBLESHOOT_MOODLE_STUDENT = 'troubleshoot_moodle_student';
const TROUBLESHOOT_MOODLE_STUDENT_2 = 'troubleshoot_moodle_student_2';
const TROUBLESHOOT_MOODLE_PROFESSOR = 'troubleshoot_moodle_professor';
const TROUBLESHOOT_WIFI_NO_ACTION = 'troubleshoot_wifi_no';
const TROUBLESHOOT_PODIUM_YES_ACTION = 'troubleshoot_podium_yes';
const TROUBLESHOOT_PODIUM_NO_ACTION = 'troubleshoot_podium_no';
const TROUBLESHOOT_WIFI_YES_ACTION = 'troubleshoot_wifi_yes';
const TROUBLESHOOT_PODIUM_SOURCE_YES_ACTION = 'troubleshoot_podium_source_yes';
const TROUBLESHOOT_PODIUM_SOURCE_NO_ACTION = 'troubleshoot_podium_source_no';
const TROUBLESHOOT_PODIUM_CABLE_YES_ACTION = 'troubleshoot_podium_cable_yes';
const TROUBLESHOOT_PODIUM_CABLE_NO_ACTION = 'troubleshoot_podium_cable_no';
const TROUBLESHOOT_PODIUM_MUTE_YES_ACTION = 'troubleshoot_podium_mute_yes';
const TROUBLESHOOT_PODIUM_MUTE_NO_ACTION = 'troubleshoot_podium_mute_no';
const TROUBLESHOOT_PRINTER_NO_ACTION = 'troublehoot_printer_no';
const END_CONVERSATION_ACTION = 'end_conversation';
const TECHNOLOGY_ARGUMENT = 'technology';
const PROBLEM_ARGUMENT = 'problem';
const PODIUM_ARGUMENT = 'podium';
const OUTPUT_CONTEXT_ARGUMENT = 'output_context';


exports.mcTroubleshoot = (request, response) =>
{
    const app = new App({request, response});
    console.log('Request headers: ' + JSON.stringify(request.headers));
    console.log('Request body: ' + JSON.stringify(request.body));

    function welcome(app) {
        app.ask('Hi! Describe your problem and I\'ll help you fix it!');
    }
    function default_fallback_intent(app){
        app.ask('Sorry, I didn\'t recognize that command. Say "help" to see what I can do.');
    }
    function help(app){
        if(app.hasSurfaceCapability(app.SurfaceCapabilities.SCREEN_OUTPUT)){
            app.askWithList(app.buildRichResponse()
                .addSimpleResponse('Here\'s what I can help you with'),
                app.buildList('Help List')
                    .addItems(app.buildOptionItem('Troubleshoot')
                        .setTitle('Troubleshoot')
                        .setDescription('Get troubleshooting help'))
                    .addItems(app.buildOptionItem('Log a Ticket')
                        .setTitle('Log a Ticket')
                        .setDescription('Log a ticket with IT'))
                    .addItems(app.buildOptionItem('Learn')
                        .setTitle('Learn')
                        .setDescription('View Popular Articles from Manhattan College\'s Knowledge Base')));

        } else {
            app.ask('I can help you troubleshoot, log a ticket, or learn more about Manhattan College Services');
        }
    }
    function help_2(app){
        if(app.hasSurfaceCapability(app.SurfaceCapabilities.SCREEN_OUTPUT)){
            let selection = app.getSelectedOption();
            if (selection === 'Troubleshoot'){
                app.ask('Please describe the problem for me');
            } else if (selection === 'Log a Ticket'){
                app.setContext('logging_ticket');
                app.ask('I can help you log a ticket, let\'s start with your name');
            } else if(selection === 'Learn') {
                app.askWithCarousel(app.buildRichResponse()
                    .addSimpleResponse('What would you like to learn more about?'),
                    app.buildCarousel()
                        .addItems(app.buildOptionItem('25 Live')
                            .setTitle('25 Live')
                            .setDescription('Learn about the 25 Live scheduling system'))
                        .addItems(app.buildOptionItem('Google Apps')
                            .setTitle('Google Apps')
                            .setDescription('Learn more about Google Apps'))
                        .addItems(app.buildOptionItem('Gmail')
                            .setTitle('Gmail')
                            .setDescription('Learn more about Gmail')));
            } else {
                app.ask('You submitted an answer that was not on the list');
            }
        } else {

        }
    }
    function help_3(app){
        if(app.hasSurfaceCapability(app.SurfaceCapabilities.SCREEN_OUTPUT)){
            let param = app.getSelectedOption();
            if(param === '25 Live'){
                app.ask(app.buildRichResponse()
                    .addSimpleResponse('Here\'s some information about 25 Live')
                    .addBasicCard(app.buildBasicCard('Manhattan College Knowledge Base')
                        .addButton('25 Live','https://manhattan.teamdynamix.com/TDClient/KB/Search?SearchText=%2325live')));
            } else if (param === 'Google Apps'){
                app.ask(app.buildRichResponse()
                    .addSimpleResponse('Here\'s some info about Google Apps')
                    .addSuggestionLink('Knowledge Base','https://manhattan.teamdynamix.com/TDClient/KB/Search?SearchText=%23Google-Apps'))
            } else if (param === 'Gmail'){

            } else {
                app.ask('You submitted an option that was not on the carousel');
            }
        } else {

        }
    }
    function begin_troubleshooting(app) {
        app.ask('Please describe the problem for me.');
    }
    function log_ticket(app){
        app.setContext('logging_ticket',5);
        app.ask('I can help you log a ticket. Let\'s start with your name.');
    }function log_ticket_name(app){
        app.ask('What device are you having problems with?');
    }function log_ticket_computer(app){
        app.ask('Can you describe the problem for me?');
    }function log_ticket_description(app){
        app.tell('Your ticket has been logged');
    }

    function troubleshoot(app) {
        let technology = app.getArgument(TECHNOLOGY_ARGUMENT);
        let problem = app.getArgument(PROBLEM_ARGUMENT);

        switch (technology) {

            case 'Computer':
                switch (problem) {
                    case 'broken':
                        if (app.hasSurfaceCapability(app.SurfaceCapabilities.SCREEN_OUTPUT)) {
                            app.ask(app.getIncomingRichResponse()
                                .addSimpleResponse("Maybe you'll find this article relevant")
                                .addBasicCard(app.buildBasicCard('How to: Boot directly to Desktop Mode in Windows 8.1')
                                    .setTitle('Team Dynamix Articles')
                                    .addButton('Read', "https://manhattan.teamdynamix.com/TDClient/KB/ArticleDet?ID=6422"))
                            );
                        } else {
                            app.ask('Please specify the problem you are having.');
                        }
                        break;
                    case 'Frozen':
                        app.ask('Make sure that all peripherals are connected properly. You may need to force restart the computer by holding the power button.');
                        break;
                    case 'dead':
                        app.tell('Make sure that the power cable is plugged in and that the outlet is working properly');
                        break;
                    case 'not connecting':
                        app.ask('');
                        break;
                    default:
                        app.ask('Sorry, I can\'t solve that yet');
                        break;
                }
                break;
            case 'Printer':
                app.setContext('printer');
                switch (problem) {
                    case 'broken':
                        app.ask('Does the printer appear on the list of connected devices?');
                        break;
                    case 'Frozen':
                        app.ask('If the printer is not responding, try restarting it and printing again.');
                        break;
                    case 'dead':
                        app.ask('Make sure that the printer\'s power cable is plugged in.');
                        break;
                    case 'not connecting':
                        app.ask('Does the printer appear on the list of connected devices?');
                        break;
                    default:
                        break;
                }
                break;
            case 'Monitor':
                switch (problem) {
                    case 'broken':
                        app.ask('Please specify the problem you are having.');
                        break;
                    case 'frozen':
                        app.ask('Make sure that the mouse is working and connected to the computer');
                        break;
                    case 'dead':
                        app.ask('Make sure that the power cable is plugged in and that the outlet is working properly');
                        break;
                    case 'not connecting':
                        app.ask('Make sure that everything is properly plugged into the computer.');
                        break;
                    default:
                        break;
                }
                break;
            case 'Mouse':
                app.tell('Check to make sure that the mouse is connected properly and try connecting it to a different usb port');
                break;
            case 'Keyboard':
                app.tell('Check to make sure that the keyboard is connected properly and try connecting it to a different usb port');
                break;
            case 'wifi':
                app.setContext('wifi');
                switch(problem){
                    case 'not connecting':
                        app.ask('Can other devices connect to the network?');
                        break;
                    default:
                        app.tell('wifi problem default message');
                        break;
                }
                break;
            case 'moodle':
                app.setContext('moodle');
                 switch(problem){
                     case 'can\'t log in':
                         app.setContext('login');
                         if(app.hasSurfaceCapability(app.SurfaceCapabilities.SCREEN_OUTPUT)){
                             app.askWithList(app.buildRichResponse()
                                 .addSimpleResponse('Which of these is the problem?'),
                             app.buildList('Moodle Login Checklist')
                                 .addItems(app.buildOptionItem('Need Username')
                                     .setTitle('I need my username'))
                                 .addItems(app.buildOptionItem('Need Password')
                                     .setTitle('I need my password'))
                                 .addItems(app.buildOptionItem('Need Activation')
                                     .setTitle('I need an activation code sent to my email')));
                         }
                         break;
                     default:
                        app.ask(app.buildRichResponse()
                            .addSimpleResponse('Are you a student or a professor?')
                            .addSuggestions('Student')
                            .addSuggestions('Professor')
                        );
                        break;
            }
                break;
            case 'podium':
                app.setContext('podium',5);
                if(app.hasSurfaceCapability(app.SurfaceCapabilities.SCREEN_OUTPUT)){
                   app.ask(app.buildRichResponse()
                       .addSimpleResponse('Is your desktop wallpaper being Projected?')
                       .addSuggestions('yes')
                       .addSuggestions('no'));
                } else {
                    app.ask('Is your desktop wallpaper being projected?');
                }
                break;
            case 'Projector':
                app.setContext('podium', 5);
                app.ask('Is your desktop wallpaper being projected?');
                break;

            default:
                app.ask('Can you describe the problem again?');
                break;
        }
    }

    function troubleshoot_podium_yes(app){
        app.ask('Check your display settings and make sure that the \'Extend Display\' setting is unchecked.');
    }function troubleshoot_podium_no(app){
        if(app.hasSurfaceCapability(app.SurfaceCapabilities.SCREEN_OUTPUT)){
            app.askWithList(app.buildRichResponse()
                .addSimpleResponse('Here\'s a list of common problems')
                    .addSuggestionLink('Projector Types', 'https://manhattan.teamdynamix.com/TDClient/KB/ArticleDet?ID=30348'),
            app.buildList('Podium Troubleshooting')
                .addItems(app.buildOptionItem('Source')
                    .setTitle('Proper Source Selected')
                    .setDescription('Make sure that the proper source is selected on the control panel'))
                .addItems(app.buildOptionItem('Damaged Cable')
                    .setTitle('Damaged Cable')
                    .setDescription('The cable you are using may be broken, inspect the wire and ends to make sure there is no visible damage'))
                .addItems(app.buildOptionItem('Video Mute')
                    .setTitle('Video Mute')
                    .setDescription('The video mute might be enabled on the control panel, make sure that it is disabled')))
        } else
            app.ask('Make sure that the proper source is selected on the control panel. Did that fix your problem?');
    }function troubleshoot_wifi_no(app){
        app.tell('The network might be down, please log a ticket with IT');
    }function troubleshoot_wifi_yes(app){
        app.tell('Check to make sure the Jaspernet is selected as your connection.');
    }function troubleshoot_podium_source_yes(app){
        app.tell('Glad I could help.');
    }function troubleshoot_podium_source_no(app){
        app.ask('Check that the cable is plugged in properly and not damaged. Did that fix the problem?');
    }function troubleshoot_podium_cable_yes(app){
        app.tell('Glad I could help.');
    }function troubleshoot_podium_cable_no(app){
        app.ask('The video mute button may be on, make sure that it is off. Did that fix the problem?');
    }function troubleshoot_podium_mute_yes(app){
        app.tell('Glad I could help.');
    }function troubleshoot_podium_mute_no(app){
        app.ask('I suggest contacting IT to help you troubleshoot this problem further.');
    }
    function troubleshoot_moodle_login(app){
        let selection = app.getSelectedOption();
        if(app.hasSurfaceCapability(app.SurfaceCapabilities.SCREEN_OUTPUT)){
            if(selection === 'I need my username'){
                app.ask('Call client services at 718-862-7873 or email at ITS@manhattan.edu');
            }else if(selection === 'I need my password'){
                app.ask(app.buildRichResponse()
                    .addSimpleResponse('Do you have a personal email on file?')
                    .addSuggestions('Yes')
                    .addSuggestions('No'));
            }else if(selection === 'I need an activation code sent to my email'){
                app.ask('Go to https://start.manhattan.edu/activate_reset');
            }else{
                app.ask('You selected an option that was not on the list');
            }
        }
    }function troubleshoot_moodle_login_yes(app){
        app.ask('Go to https://start.manhattan.edu/activate_reset');
    }function troubleshoot_moodle_login_no(app){
        app.ask('Call client services at 718-862-7873 or email at ITS@manhattan.edu');
    }
    function troubleshoot_moodle_student(app){
        if(app.hasSurfaceCapability(app.SurfaceCapabilities.SCREEN_OUTPUT)) {
            app.askWithList(app.buildRichResponse()
                    .addSimpleResponse('Here\'s a list of possible solutions'),
                app.buildList('Student Moodle Checklist')
                    .addItems(app.buildOptionItem('Registered?')
                        .setTitle('Registered?')
                        .setDescription('Make sure that you are registered and that the registrar has added you to the course'))
                    .addItems(app.buildOptionItem('Visible?')
                        .setTitle('Visible?')
                        .setDescription('Check with your professor that they use Moodle and that the course is set to "visible" under course settings'))
                    .addItems(app.buildOptionItem('Waited?')
                        .setTitle('Waited?')
                        .setDescription('Make sure that you\'ve waited 24 hours since signing up for the class'))
            );
        } else {
            app.ask('Have you made sure that you are registered for the course?');
        }
    }
    function troubleshoot_moodle_student_2(app){
        if(app.hasSurfaceCapability(app.SurfaceCapabilities.SCREEN_OUTPUT)) {
            const selection = app.getContextArgument('actions_intent_option',
                'OPTION').value;

            // Compare the user's selections to each of the item's keys
            if (!selection) {
                app.ask('You did not select any item from the list or carousel');
            } else if (selection === 'Registered?') {
                app.ask(app.buildRichResponse()
                    .addSimpleResponse('Here\'s info about the registrar')
                    .addBasicCard(app.buildBasicCard()
                        .setTitle('Registrar Info')
                        .addButton('Link', 'https://inside.manhattan.edu/academic-resources/registrar/index.php')));
            } else if (selection === 'Visible?') {
                app.ask('Check with your professor that they use Moodle and that the course is set to "visible" under course settings.');
            } else if (selection === 'Waited?') {
                app.ask('Make sure 24 hours have passed since you\'ve registered for the class');
            } else {
                app.ask('You selected an unknown item from the list or carousel');
            }
        } else {
            app.ask('Check with the registrar and make sure that you are registered for the course');
        }
    }
    function troubleshoot_moodle_professor(app){
        if(app.hasSurfaceCapability(app.SurfaceCapabilities.SCREEN_OUTPUT)){
            app.ask(app.buildRichResponse()
                .addSimpleResponse('Professors should troubleshoot their accounts with IT directly. The number for client services is 718 862 7873'));
        }
        app.ask('Professors should troubleshoot their accounts with IT directly');
    }
    function end_conversation(app){
        app.tell('I was never here.');
    }

    function test(app){
        if(app.hasSurfaceCapability(app.SurfaceCapabilities.SCREEN_OUTPUT)) {
            app.askWithCarousel('Help me get this working',
                app.getIncomingCarousel().addItems(
                    app.buildOptionItem('another_choice', ['Another choice']).
                    setTitle('Another choice').setDescription('Choose me!')));
        } else {
            app.ask('test message');
        }
    }

    function test_two(app){
        app.askWithList(app.buildRichResponse()
                .addSimpleResponse('Alright')
                .addSuggestions(
                    ['Basic Card', 'List', 'Carousel', 'Suggestions']),
            // Build a list
            app.buildList('Help List')
            // Add the first item to the list
                .addItems(app.buildOptionItem('MATH_AND_PRIME',
                    ['math', 'math and prime', 'prime numbers', 'prime'])
                    .setTitle('Math & prime numbers')
                    .setDescription('42 is an abundant number because the sum of its ' +
                        'proper divisors 54 is greater…')
                    .setImage('http://example.com/math_and_prime.jpg', 'Math & prime numbers'))
                // Add the second item to the list
                .addItems(app.buildOptionItem('EGYPT',
                    ['religion', 'egpyt', 'ancient egyptian'])
                    .setTitle('Ancient Egyptian religion')
                    .setDescription('42 gods who ruled on the fate of the dead in the ' +
                        'afterworld. Throughout the under…')
                    .setImage('http://example.com/egypt', 'Egypt')
                )
                // Add third item to the list
                .addItems(app.buildOptionItem('RECIPES',
                    ['recipes', 'recipe', '42 recipes'])
                    .setTitle('42 recipes with 42 ingredients')
                    .setDescription('Here\'s a beautifully simple recipe that\'s full ' +
                        'of flavor! All you need is some ginger and…')
                    .setImage('http://example.com/recipe', 'Recipe')
                )
        );
    }
    let actionMap = new Map();
    actionMap.set(DEFAULT_FALLBACK_INTENT_ACTION, default_fallback_intent);
    actionMap.set(DEFAULT_WELCOME_INTENT, welcome);
    actionMap.set(HELP_ACTION, help);
    actionMap.set(HELP_2_ACTION, help_2);
    actionMap.set(HELP_3_ACTION, help_3);
    actionMap.set(TEST_ACTION,test);
    actionMap.set(TEST_TWO_ACTION,test_two);
    actionMap.set(BEGIN_TROUBLESHOOTING_ACTION, begin_troubleshooting);
    actionMap.set(TROUBLESHOOT_MOODLE_STUDENT, troubleshoot_moodle_student);
    actionMap.set(TROUBLESHOOT_MOODLE_STUDENT_2, troubleshoot_moodle_student_2);
    actionMap.set(TROUBLESHOOT_MOODLE_PROFESSOR, troubleshoot_moodle_professor);
    actionMap.set(LOG_TICKET_ACTION,log_ticket);
    actionMap.set(LOG_TICKET_NAME_ACTION, log_ticket_name);
    actionMap.set(LOG_TICKET_COMPUTER_ACTION, log_ticket_computer);
    actionMap.set(LOG_TICKET_DESCRIPTION_ACTION, log_ticket_description);
    actionMap.set(TROUBLESHOOT_ACTION, troubleshoot);
    actionMap.set(TROUBLESHOOT_MOODLE_LOGIN, troubleshoot_moodle_login);
    actionMap.set(TROUBLESHOOT_MOODLE_LOGIN_YES, troubleshoot_moodle_login_yes);
    actionMap.set(TROUBLESHOOT_MOODLE_LOGIN_NO, troubleshoot_podium_cable_no);
    actionMap.set(TROUBLESHOOT_WIFI_NO_ACTION, troubleshoot_wifi_no);
    actionMap.set(TROUBLESHOOT_WIFI_YES_ACTION, troubleshoot_wifi_yes);
    actionMap.set(END_CONVERSATION_ACTION, end_conversation);
    actionMap.set(TROUBLESHOOT_PODIUM_YES_ACTION, troubleshoot_podium_yes);
    actionMap.set(TROUBLESHOOT_PODIUM_NO_ACTION, troubleshoot_podium_no);
    actionMap.set(TROUBLESHOOT_PODIUM_SOURCE_YES_ACTION, troubleshoot_podium_source_yes);
    actionMap.set(TROUBLESHOOT_PODIUM_SOURCE_NO_ACTION, troubleshoot_podium_source_no);
    actionMap.set(TROUBLESHOOT_PODIUM_CABLE_YES_ACTION, troubleshoot_podium_cable_yes);
    actionMap.set(TROUBLESHOOT_PODIUM_CABLE_NO_ACTION, troubleshoot_podium_cable_no);
    actionMap.set(TROUBLESHOOT_PODIUM_MUTE_YES_ACTION, troubleshoot_podium_mute_yes);
    actionMap.set(TROUBLESHOOT_PODIUM_MUTE_NO_ACTION, troubleshoot_podium_mute_no);
    app.handleRequest(actionMap);
}