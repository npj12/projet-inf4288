import { Helmet } from 'react-helmet-async';

import { CreateView } from '../sections/create_agent/view';

// ----------------------------------------------------------------------

export default function CreatePage() {
  return (
    <>
      <Helmet>
        <title> Create new agent | Betterave </title>
      </Helmet>

      <CreateView />
    </>
  );
}
