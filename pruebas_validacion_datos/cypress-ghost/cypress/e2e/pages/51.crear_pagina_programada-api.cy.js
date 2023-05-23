import configJson from '../../../config/config.json';
import loginPage from "../../page-object/login";
import PagesPage from "../../page-object/pages";
import ApiDataPool from '../../helpers/apiData';

const nameScreenshots = 'pages/page_schedule/page_schedule_';

describe('Escenarios page', () => {
    it('Página, crear página con titulo de menos de 255 caracteres y descripción y dejarla programada', async () => {
        // Given
        const pageData = {
            title: await ApiDataPool.getRandomShortSentence(),
            description: await ApiDataPool.getRandomLongSentence()
        }
        let i = 0
        cy.visit(configJson.host);

        // When
        loginPage.login(configJson.user, configJson.password);
        cy.screenshot(`${nameScreenshots}${i += 1}`, { overwrite: true });

        PagesPage.goToNewPageFromListPageView();

        PagesPage.typeTitleAndDescription(pageData.title, pageData.description);

        PagesPage.schedulePage();

        PagesPage.goToAnchorButtonPage();

        // Then
        cy.get("h3.gh-content-entry-title").contains(pageData.title).should('exist');
        cy.get("span[title='Scheduled']").contains('Scheduled').should('exist');
        cy.screenshot(`${nameScreenshots}${i += 1}`, { overwrite: true });

        // Clean the enviroment tested
        PagesPage.cleanRecentPage(cy.get("h3.gh-content-entry-title").contains(pageData.title));
    });
})

