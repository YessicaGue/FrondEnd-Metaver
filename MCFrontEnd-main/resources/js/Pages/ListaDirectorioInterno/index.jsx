import React, {useState, useEffect, useMemo, useCallback} from 'react';
import {Head, Link, router} from '@inertiajs/react';
import CustomLayout from '@/Layouts/CustomLayout';
import ParticlesLinks from '@/Components/Customized/ParticlesComponents/ParticlesLinks';

// import ListaUsuarios from './ListaUsuarios';
import ListaUsuarios from '@/Pages/ListaDirectorioInterno/Tableview';

const index = (props)=>{
    const datos = [
        { organo: 'Consejo Nacional', dirigente: 'VERONICA DELGADILLO GARCÍA ' },
        { organo: 'Secretaría Técnica del Consejo Nacional', dirigente: 'VANIA ROXANA ÁVILA GARCÍA ' },
        { organo: ' Coordinación General del Programa Nacional de Actividades', dirigente: 'ADÁN PÉREZ UTRERA ' },
        { organo: 'Coordinación Nacional de Enlace Político', dirigente: 'IVONNE ARACELY ORTEGA PACHECO' },
        { organo: 'Comisión Nacional de Vinculación Empresarial', dirigente: 'MANUEL HERRERA VEGA' },
        { organo: 'Comisión Nacional de Vinculación con el Sector Agropecuario', dirigente: 'PEDRO JIMENEZ LEON' },
        { organo: 'Comisión Nacional de Vinculación con Académicos y Técnicos', dirigente: 'FRANCISCO JAVIER SALAZAR SÁENZ' },
        { organo: 'Comisión Nacional de Vinculación con el Sector Deportivo', dirigente: 'CARLOSPADILLA BECERRA' },
        { organo: 'Tesorería Nacional', dirigente: 'AGUSTIN TORRES  DELGADO' },
        { organo: 'Comité Promotor de Foros el Futuro es Socialdemócrata', dirigente: 'MARTHA ANGÉLICA TAGLE MARTÍNEZ' },
        { organo: ' Instituto de Capacitación y Concertación Ciudadana', dirigente: 'MARÍA CAROLINA SALINAS LAGARDE' },
        { organo: 'Secretaría de Organización y Acción Política', dirigente: 'JOSÉ FRANCISCO MELO VELÁZQUEZ' },
        { organo: 'Secretaría de Asuntos Electorales', dirigente: 'MIGUEL ÁNGEL MUÑOZ MUNGUIA' },
        { organo: 'Secretaría de Vinculación y Participación Ciudadana', dirigente: 'RUBÉN ISAAC BARRIOS OCHOA' },
        { organo: 'Secretaría de Organizaciones Sectoriales', dirigente: 'CARLOS ALBERTO LEÓN GARCÍA' },
        { organo: 'Secretaría de Derechos Humanos e Inclusión Social', dirigente: 'LAURA HERNÁNDEZ GARCÍA' },
        { organo: 'Secretaría de las Personas con Discapacidad', dirigente: 'JUAN ARMANDO RUIZ HERNÁNDEZ' },
        { organo: 'Secretaría de Movimiento Sociales', dirigente: 'FAUSTO BARAJAS CUMMINGS' },
        { organo: 'Secretaría de Asuntos Municipales', dirigente: 'BENJAMIN ALAMILLO GONZÁLEZ' },
        { organo: 'Secretaría de Comunicación Social', dirigente: 'TANNIA VALERY ROSAS VEGA' },
        { organo: 'Secretaría de Gestion Social', dirigente: 'LAURA IRAIS BALLESTEROS MANCILLA' },
        { organo: 'Secretaría de Asuntos Jurídicos', dirigente: 'AGUSTIN REJÓN GÓMEZ' },
        { organo: 'Secretaría de Pueblos Originarios', dirigente: 'ABIGAIL UC CANCHÉ' },
        { organo: 'Secretaría de Asuntos Ambientales', dirigente: 'ESTEFANIA DE GARAY CABALLERO' },
        { organo: 'Secretaría de Asuntos Legislativos', dirigente: 'PABLO VÁZQUEZ AHUED' },
        { organo: 'Secretaría de Círculos Ciudadanos', dirigente: 'ALFONSO ARMANDO VIDALES VARGAS OCHOA' },
        { organo: 'Secretaría de Fomento Deportivo', dirigente: 'GILBERTO GÁLVEZ LÓPEZ' },
        { organo: 'Secretaría de Propaganda y Difusión', dirigente: 'IVIDELIZA REYES HERNÁNDEZ' },
        { organo: 'Representante ante el Instituto Nacional Electoral', dirigente: 'JUAN MIGUEL CASTRO RENDÓN' },
        { organo: 'Centro de Documentación e Información', dirigente: 'JUAN PABLO ARELLANO FONSECA' },
        { organo: 'Coordinación de la Bancada en el Senado', dirigente: 'JOSÉ CLEMENTE CASTAÑEDA HOEFLICH' },
        { organo: 'Coordinación de la Bancada en la Cámara de Diputados', dirigente: 'JORGE ÁLVAREZ MÁYNEZ' },
        { organo: 'Coordinación Nacional de las diputadas y diputados a las legislaturas de los Estados de Movimiento Ciudadano', dirigente: 'MONICA PAOLA MAGAÑA MENDOZA' },
        { organo: 'Coordinación Nacional de Autoridades Municipales de Movimiento Ciudadano', dirigente: 'BIBY KAREN RABELO DE LA TORRE' },
        { organo: 'Coordinación de Mujeres en Movimiento', dirigente: 'JESSICA MARÍA GUADALUPE ORTEGA DE LA CRUZ' },
        { organo: 'Vicecoordinación de Mujeres en Movimiento', dirigente: 'MARIBEL RAMÍREZ TOPETE' },
        { organo: 'Coordinación de Jóvenes en México', dirigente: 'MARIANELA VILLASUSO VILLANUEVA' },
        { organo: 'Vicecoordinación de Jóvenes en México', dirigente: 'LUZ CAMILA GUERRA ACEVEDO' },
        { organo: 'Coordinación de Trabajadores y Productores', dirigente: 'RICARDO ESPINOZA LOPEZ' },
        { organo: 'Vicecoordinación de Trabajadores y Productores', dirigente: 'ROSA ALBA RAMÍREZ NACHIS' },
        { organo: ' Fundación Cultura en Movimiento', dirigente: 'RUTH ALEJANDRA LÓPEZ HERNÁNDEZ' },
        { organo: 'Fundación Lázaro Cárdenas', dirigente: 'ALEJANDRO CHANONA BURGUETE' },
        { organo: 'Fundación México con Valores', dirigente: 'BRAULIO LÓPEZ OCHOA MIJARES' },
        { organo: 'Fundación Ursúlo Galván', dirigente: 'FERRER GALVÁN ACOSTA' },
        { organo: 'Fundación Municipios en Movimiento', dirigente: 'JOSÉ MANUEL DEL RÍO VIRGEN' },
        { organo: 'Periódico El Ciudadano', dirigente: 'ARTURO SÁNCHEZ MEYER' },
        { organo: 'Coordinación Regional Circunscripción 1', dirigente: 'JORGE ALFREDO LOZOYA SANTILLÁN' },
        { organo: 'Coordinación Regional Circunscripción 2', dirigente: 'IRAIS VIRGINIA REYES DE LA TORRE' },
        { organo: 'Coordinación Regional Circunscripción 3', dirigente: 'GERARDO GAUDIANO ROVIROSA' },
        { organo: 'Coordinación Regional Circunscripción 4', dirigente: 'GILDARDO PÉREZ GABINO' },
        { organo: 'Coordinación Regional Circunscripción 5', dirigente: 'MA TERESA OCHOA MEJÍA' },
        { organo: ' Comisión de Gestión de Proyectos y Presupuesto a Entidades Federativas y Municipios', dirigente: 'ADRIÁN SIGFRIDO ÁVILA ESTRADA' },
        { organo: 'Comisión de Organización de Comités Electorales', dirigente: 'GUSTAVO FLORES LLAMAS' },
        { organo: 'Comisión de Activismo', dirigente: 'ISRAEL EDUARDO GARCÍA HERNÁNDEZ' },
        { organo: 'Comisión de la Diversidad Sexual', dirigente: 'ELSA PATRIA JIMÉNEZ FLORES' },
        { organo: 'Comisión del Mexicano Migrante', dirigente: 'PILAR LOZANO MCDONALD' },
        { organo: 'Presidente de la Comisión de Vinculación Universitaria y Tecnológica', dirigente: 'JOSÉ ALBERTO GALARZA VILLASEÑOR' },
        { organo: 'Comisión de atencion integral a la tercera edad', dirigente: 'TERESA VALE CASTILLA' },
        { organo: 'Comisión de Seguimiento de Órganos de Dirección en Redes', dirigente: 'GUILLERMO ARTURO ROCHA LIRA' },
        { organo: 'Militante Destacado', dirigente: 'EUGENIO GUADALUPE GOVEA ARCOS' },
        { organo: 'Militante Destacado', dirigente: 'GLORIA ELIZABETH NUÑEZ SÁNCHEZ' },
        { organo: 'Militante Destacado', dirigente: 'JOSÉ LUIS PECH VÁRGUEZ' },
        { organo: ' Comisión Nacional de Transparenica y Acceso a la Información', dirigente: 'ANAYELI MUÑOZ MORENO' },
        { organo: 'Comisión de Justicia Intrapartidaria', dirigente: 'SÓSTENES MARIO RAMÍREZ BRETÓN' },
        { organo: ' Comisión Nacional de Convenciones y Procesos Internos', dirigente: 'CARMEN JULIETA MACIAS RABAGO' },
        { organo: 'Comisión Nacional de Gasto y Financiamiento', dirigente: 'LUIS MANUEL ANTÚNEZ OVIEDO' },
        { organo: 'Coordinación de Proyectos Prioritarios', dirigente: 'DAVID OLIVO ARRIETA' }
    ];
        return (
            <CustomLayout
            visible={true}
            >
                <ParticlesLinks color="#FF8300"/>
                <Head title="Perfiles Usuarios"/>
                <div className='flex flex-col w-full mt-[100px] justify-center items-center'>
                    <div className="max-w-screen-md">
                        <ListaUsuarios usuarios={datos} />
                    </div>
                </div>
            </CustomLayout>
    );
}
  
export default index;
