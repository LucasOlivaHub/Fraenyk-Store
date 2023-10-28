import Breadcrumb from 'react-bootstrap/Breadcrumb';

function SeccionesPagina({seccion1, seccion2}) {
  return (
    <Breadcrumb>
      <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
      {seccion1 &&
      <Breadcrumb.Item>
        {seccion1}
      </Breadcrumb.Item>}
      {seccion2 &&
        <Breadcrumb.Item>Data</Breadcrumb.Item>
      }
 
 
    </Breadcrumb>
  );
}

export default SeccionesPagina;