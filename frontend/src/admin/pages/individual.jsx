import { Helmet } from 'react-helmet-async';

import { IndividualView } from 'src/sections/individual/view';

// ----------------------------------------------------------------------

export default function IndividualPage() {
  return (
    <>
      <Helmet>
        <title> Individual | Betterave </title>
      </Helmet>

      <IndividualView />
    </>
  );
}
