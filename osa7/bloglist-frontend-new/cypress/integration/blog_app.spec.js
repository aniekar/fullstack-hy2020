describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    const user = {
      name: 'Otto von Bismarck',
      username: 'ottovon',
      password: 'bismarck',
    }
    cy.request('POST', 'http://localhost:3001/api/users/', user)
    cy.visit('http://localhost:3000')
  })

  it('login form is shown', function() {
    cy.contains('username')
    cy.contains('password')
    cy.contains('Login')
  })

  describe('Login', function() {
    it('user can log in', function() {
      cy.get('#username').type('ottovon')
      cy.get('#password').type('bismarck')
      cy.get('#login-button').click()
      cy.contains('Otto von Bismarck logged in')
    })

    it('login fails with wrong password', function() {
      cy.get('#username').type('ottovon')
      cy.get('#password').type('notmypassword')
      cy.get('#login-button').click()

      cy.get('#notification')
        .should('contain', 'Wrong username or password')
        .and('have.css', 'background-color', 'rgb(255, 228, 196)')
        .and('have.css', 'border-style', 'solid')
      cy.get('html').should('not.contain', 'Otto von Bismarck logged in')
    })

    describe('When logged in', function() {
      beforeEach(function() {
        cy.login({ username: 'ottovon', password: 'bismarck' })
      })

      it('a blog can be created', function() {
        cy.contains('Add new blog').click()
        cy.get('#title').type('Test title')
        cy.get('#author').type('A robot')
        cy.get('#url').type('http://www.url.com')
        cy.get('#add-button').click()

        cy.contains('Test title')
      })

      describe('A blog exists', function() {
        beforeEach(function() {
          cy.createNew({
            title: 'Test title',
            author: 'Test author',
            url: 'http://www.test.com',
          })
        })

        it('and can be liked', function() {
          cy.contains('Show').click()
          cy.contains('Like').click()
          cy.contains('Likes: 1')
        })
      })
    })
  })
})
