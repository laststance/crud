context('Visitor Basic', () => {
  it('show blog title', () => {
    cy.visit('http://localhost:3000/')
    cy.$('header').should('contain', 'Today I Learned')
  })

  it('show lait article list', () => {
    cy.visit('http://localhost:3000/')
    cy.$('top-page-content-root').should('contain', 'close your eyes')
  })

  it('show single post', () => {
    cy.visit('http://localhost:3000/')
    cy.$('single-post-page-link-1').click()
    // pageTrangition /:postId
    cy.$('post-page-content-root')
      .should('exist')
      .should('contain', 'CSS Weekly #464')
  })

  it('never shown every admin page link button without login', () => {
    cy.visit('http://localhost:3000/')
    cy.$('signup-btn').should('not.exist')
    cy.$('dashoard-page-transition-link-btn').should('not.exist')

    cy.$('single-post-page-link-2').click()
    cy.$('edit-btn').should('not.exist')
  })

  it('show post that contains syntax hilight Markdown', () => {
    cy.visit('http://localhost:3000/')
    // 07/27/21 React Rush
    cy.$('single-post-page-link-15').should('exist').click()
    cy.$('post-page-content-root')
      .should('exist')
      .should('contain', 'using __proto__')
  })

  context('Pagenation', () => {
    it('showing current & total page number', () => {
      cy.visit('http://localhost:3000/')
      cy.$('single-post-page-link-1').should('contain.text', 'close your eyes')
      cy.$('page-count').should('contain.text', '1 / 4')
    })
    it('working next button', () => {
      cy.$('next-page-btn').click()
      cy.$('single-post-page-link-1')
        .should('exist')
        .should('contain.text', 'Researching production docker-compose setting')
      cy.$('page-count').should('contain.text', '2 / 4')
    })
    it('working prev button', () => {
      cy.$('prev-page-btn').click()
      cy.$('single-post-page-link-1').should('contain.text', 'close your eyes')
      cy.$('page-count').should('contain.text', '1 / 4')
    })
    it('disabled prev button at 1st page', () => {
      cy.$('page-count').should('contain.text', '1 / 4')
      cy.$('prev-page-btn').should('be.disabled')
    })
    it('disabled next page at last page', () => {
      cy.$('next-page-btn').click()
      cy.$('page-count').should('contain.text', '2 / 4')

      cy.$('next-page-btn').click()
      cy.$('page-count').should('contain.text', '3 / 4')

      cy.$('next-page-btn').click()
      cy.$('page-count').should('contain.text', '4 / 4')

      cy.$('next-page-btn').should('be.disabled')
    })
  })
})
