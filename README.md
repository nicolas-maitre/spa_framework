# Kaphoot
Kaphoot is a web based quizz application  
The backend is developped in php and the fronted in JavaScript.  

## Pages framework
The pages framework is used to asynchronously display the website pages to the client.
It also serves to call the api and display the data.

### Pages Config
The main configuration file is `pageConfig.js`. 
It's used to specify how and where data should be displayed and other page specific parameters.  

**Structure**  
Example: "Quizz" page structure.
```javascript
var pagesConfig = {
    quizz: { 
        headButton: {
            text: "Home",
            target: "home"
        },
        view: "quizz",
        refreshDataOnDisplay: true, 
        data: [
            //data config 1: used to display the questions list
            { 
                source: "questionsForQuizz",
                pathTemplate: "/{{quizzId}}", 
                container: ".quizzQuestionsContainer",
                adapter: "questionInputLine"
            },
            //data config 2: used to get the quizz data
            {
                source: "quizz",
                pathTemplate: "/{{id}}", 
                dataName: "quizz"
            }
        ]
    }
}
```
**Page name**  
The page name is defined by the key of the page config. In this case it's `quizz`. It will be used for the page url.  

**HeadButton**  
The head button config is used ton configure the text and target of the button located at the top right of most of the pages.  

**View**  
The view parameter defines the view name that will be used for this page. by default, the page name will be used.  
The view files are located in the `/views` directory.  

**Data**  
The data parameter expects an array of data configs.  
- `source` contains the name of the method defined in the `scripts/dataSources.js` script.  
- `pathTemplate` contains the template defining the parameters extracted from the url and passed to the dataSource.  
Example:  
    - url: `/quizz/1234/question/3456/answers`
    - pathTemplate: `/quizz/{{quizzId}}/question/{{questionId}}/answers`
    - result: `{quizzId: "1234", questionId: "3456"}`  
- `container` contains the css selector of the data adapters container.  
Example: `form > .quizzContainer`
- `adapter` contains the name of the data adapter used to display the data. It directly references the method name in `/scripts/builder.js -> adapters`
- `dataName`: defines the property name the data will take if it's not passed throught an adapter. In this case, the `onPageData[pageName]` (`/scripts/actions.js`) callBack will be called on dataSource response.

## Api


## Questions
### Types
implemented:
- single_line_text
- text
not implemented
- qcm
- answer_text