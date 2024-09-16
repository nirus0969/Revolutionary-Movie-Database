const username = generateUsername();

describe('user spec', () => {
  it('Can handle login functionality', () => {
    const username: string = 'gordonlovesbjj';
    const password: string = 'gordon';

    cy.visit('/');
    cy.get('[data-testid="user-dropdown-item"]').should('exist').click();
    cy.get('[data-testid="login-button"]').should('exist').click();

    cy.get('[data-testid="email-login-field"]')
      .should('exist')
      .type(username + 'j{leftArrow}{del}');

    cy.get('[data-testid="password-login-field"]').should('exist').type(password);

    cy.get('[data-testid="loginmodal-loginbutton"]').should('exist').click();

    cy.get('[data-testid="user-dropdown-menu"]').should(
      'have.text',
      username.substring(0, 3) + username
    );

    cy.get('[data-testid="user-dropdown-menu"]').as('btn').click();

    cy.get('[data-testid="navigate-to-watchlist-button"]').should('exist');
    cy.get('[data-testid="logout-button"]').should('exist');
  });

  it('Can properly register a user', () => {
    cy.visit('/');
    cy.get('[data-testid="user-dropdown-item"]').should('exist').click();

    cy.get('[data-testid="register-button"]').should('exist').click();

    cy.get('[data-testid="registeruser-username-input"]').should('exist').type(username);

    cy.get('[data-testid="registeruser-password-input"]').should('exist').type(username);

    cy.get('[data-testid="registeruser-confirm-password-input"]')
      .should('exist')
      .type(username);

    cy.get('[data-testid="registeruser-confirm-button"]').should('exist').click();

    cy.get('[data-testid="user-dropdown-menu"]').as('btn').click();

    cy.get('[data-testid="login-button"]').should('not.exist');
    cy.get('[data-testid="register-button"]').should('not.exist');
    cy.get('[data-testid="navigate-to-watchlist-button"]').should('exist');
    cy.get('[data-testid="logout-button"]').should('exist').click();
  });

  it('Can properly rate a movie', () => {
    cy.visit('/');
    const testMovie = {
      title: 'The Creator',
      runtime: '2h 14min',
      releasedate: '27/09/2023',
      genres: ['Science Fiction', 'Action', 'Thriller'],
      overview:
        'Amid a future war between the human race and the forces of artificial intelligence, a hardened ex-special forces agent grieving the disappearance of his wife, is recruited to hunt down and kill the Creator, the elusive architect of advanced AI who has developed a mysterious weapon with the power to end the war—and mankind itself.',
    };

    cy.get('[data-testid="user-dropdown-item"]').should('exist').click();
    cy.get('[data-testid="login-button"]').should('exist').click();

    cy.get('[data-testid="email-login-field"]').should('exist').type(username);

    cy.get('[data-testid="password-login-field"]').should('exist').type(username);

    cy.get('[data-testid="loginmodal-loginbutton"]').should('exist').click();

    cy.get(`[data-testid="searchpage-moviecard-${testMovie.title}"]`)
      .should('exist')
      .click();

    cy.get('[data-testid="rating-display-votecount"]')
      .invoke('text')
      .then((text) => {
        const numeric = text.replace(/\D/g, '');
        const new_votecount = parseInt(numeric, 10) + 1;

        cy.get('[data-testid="detailed-moviecard-rate-button-The Creator"]')
          .should('exist')
          .click();

        cy.get('.gap-2 > [data-testid="ratingmodal-rating-display"] > .far')
          .should('exist')
          .click();

        cy.get('[data-testid="ratingmodal-confirm-button"]').should('exist').click();

        cy.get('[data-testid="rating-display-votecount"]')
          .should('exist')
          .should('have.text', '(' + new_votecount.toString() + ')');
      });
  });

  it('Can add and remove movie from watchlist', () => {
    const username: string = 'gordonlovesbjj';
    const password: string = 'gordon';

    cy.visit('/');
    cy.get('[data-testid="user-dropdown-item"]').should('exist').click();
    cy.get('[data-testid="login-button"]').should('exist').click();

    cy.get('[data-testid="email-login-field"]')
      .should('exist')
      .type(username + 'j{leftArrow}{del}');

    cy.get('[data-testid="password-login-field"]').should('exist').type(password);

    cy.get('[data-testid="loginmodal-loginbutton"]').should('exist').click();

    cy.get('[data-testid="searchpage-moviecard-Elemental"]').should('exist').click();

    cy.get('[data-testid="add-remove-watchlist-button"]').should('exist').click();

    cy.get('[data-testid="user-dropdown-item"]').should('exist').click();
    cy.get('[data-testid="navigate-to-watchlist-button"]').should('exist').click();

    cy.get('[data-testid="searchpage-moviecard-Elemental"]').should('exist').click();

    cy.get('[data-testid="add-remove-watchlist-button"]').should('exist').click();

    cy.get('[data-testid="user-dropdown-item"]').should('exist').click();
    cy.get('[data-testid="navigate-to-watchlist-button"]').should('exist').click();

    cy.get('[data-testid="searchpage-moviecard-Elemental"]').should('not.exist');
  });
});

function generateUsername(): string {
  const alphabet = 'abcdefghijklmnopqrstuvwxyz';
  let username = '';

  for (let i = 0; i < 4; i++) {
    const randomIndex = Math.floor(Math.random() * alphabet.length);
    username += alphabet.charAt(randomIndex);
  }

  return username;
}
