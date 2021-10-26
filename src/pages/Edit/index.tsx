import type { RouteComponentProps } from '@reach/router'
import React, { memo } from 'react'

import BaseLayout from '../../components/Layout'
import Button from '../../elements/Button'
import Loading from '../../elements/Loading'
import { assertIsDefined } from '../../lib/assertIsDefined'
import renderRTKQueryErrorMessages from '../../lib/renderRTKQueryErrorMessages'
import { API } from '../../redux/API'

import useEditPageEffect from './useEditPageEffect'

const Layout: React.FC = memo(({ children }) => (
  <BaseLayout className="flex flex-col justify-start">{children}</BaseLayout>
))
Layout.displayName = 'Layout'

interface RouteParam {
  postId: Post['id']
}

const Edit: React.FC<RouteComponentProps<RouteParam>> = memo(
  ({ postId: id }) => {
    assertIsDefined(id)

    const { data, isLoading, error } = API.endpoints.fetchPost.useQuery(id)
    const { title, body, handleEdit, handleChange } = useEditPageEffect(
      id,
      data,
      error
    )

    if (error) {
      return <Layout>{renderRTKQueryErrorMessages(error)}</Layout>
    }

    if (isLoading || data === undefined) {
      return (
        <Layout>
          <Loading />
        </Layout>
      )
    }

    return (
      <Layout>
        <input
          type="text"
          className="mt-3"
          value={title}
          onChange={(e) => handleChange(e, 'title')}
          data-cy="edit-title-input"
        />
        <textarea
          className="h-60 w-full mt-3"
          value={body}
          onChange={(e) => handleChange(e, 'body')}
          data-cy="edit-body-input"
        />
        <div className="flex justify-end pt-8">
          <Button onClick={handleEdit} variant="secondary" data-cy="update-btn">
            Update
          </Button>
        </div>
      </Layout>
    )
  }
)

export default Edit
