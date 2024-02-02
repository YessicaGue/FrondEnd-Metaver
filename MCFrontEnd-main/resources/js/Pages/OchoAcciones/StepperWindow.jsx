import React from 'react';
import { styled } from '@mui/material/styles';
import { Box, Stepper, Step, StepLabel, Button, Typography } from '@mui/material';
import StepConnector, { stepConnectorClasses } from '@mui/material/StepConnector';

export const StepperWindow = ({ set, icons, handleSubmit, setForm , form}) => {
  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set());

  const [ ...copySet  ] = set;
  const elements = copySet.map(({ data }) => data);
  const validInputsList = copySet.map(({ validInputsList }) => validInputsList);

  const isStepOptional = (step) => {
    // return step === 1;
    return false;
  };

  const isStepSkipped = (step) => {
    return skipped.has(step);
  };

  const handleNext = () => {
    switch(activeStep){
      case 0:
        setForm({ ...form, stepOneSubmitted: true });
        break;
      case 1:
        setForm({ ...form, stepTwoSubmitted: true });
        break;
      case 2:
        setForm({ ...form, stepThreeSubmitted: true });
        break;
    }
    const invalid = Object.values(validInputsList[activeStep]).some((valid) => valid === false);
    if(invalid){
      /** Pintar de rjo el stepper */
      return;
    }
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSkip = () => {
    if (!isStepOptional(activeStep)) {
      // You probably want to guard against something like this,
      // it should never occur unless someone's actively trying to break something.
      throw new Error("You can't skip a step that isn't optional.");
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped((prevSkipped) => {
      const newSkipped = new Set(prevSkipped.values());
      newSkipped.add(activeStep);
      return newSkipped;
    });
  };

  const ColorlibConnector = styled(StepConnector)(({ theme }) => ({
    [`&.${stepConnectorClasses.alternativeLabel}`]: {
      top: 22,
    },
    [`&.${stepConnectorClasses.active}`]: {
      [`& .${stepConnectorClasses.line}`]: {
        backgroundImage:
          'linear-gradient( 95deg,rgb(255,131,0) 0%, rgb(255,186,75) 100%)',
      },
    },
    [`&.${stepConnectorClasses.completed}`]: {
      [`& .${stepConnectorClasses.line}`]: {
        backgroundImage:
          'linear-gradient( 95deg,rgb(255,131,0) 0%, rgb(255,186,75) 100%)',
      },
    },
    [`& .${stepConnectorClasses.line}`]: {
      height: 3,
      border: 0,
      backgroundColor:
        theme.palette.mode === 'dark' ? theme.palette.grey[800] : '#eaeaf0',
      borderRadius: 1,
    },
  }));

  const ColorlibStepIconRoot = styled('div')(({ theme, ownerState }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? theme.palette.grey[700] : '#ccc',
    zIndex: 1,
    color: '#fff',
    width: 50,
    height: 50,
    display: 'flex',
    borderRadius: '50%',
    justifyContent: 'center',
    alignItems: 'center',
    ...(ownerState.active && {
      backgroundImage:
        'linear-gradient( 136deg, rgb(255,131,0) 0%, rgb(255,186,75) 100%)',
      boxShadow: '0 4px 10px 0 rgba(191,137,50,.55)',
    }),
    ...(ownerState.completed && {
      backgroundImage:
        'linear-gradient( 136deg, rgb(255,131,0) 0%, rgb(255,186,75) 100%)',
    }),
  }));
  
  function ColorlibStepIcon(props) {
    const { active, completed, className } = props;
  
    return (
      <ColorlibStepIconRoot ownerState={{ completed, active }} className={ className }>
        { icons[String(props.icon)] }
      </ColorlibStepIconRoot>
    );
  }

  const StepperHead = () => {
    return (
      <Stepper sx={{ mb: 4 }} activeStep={ activeStep } alternativeLabel connector={<ColorlibConnector />}>
        {set.map(({label}, index) => {
          const stepProps = {};
          const labelProps = {};
          if (isStepOptional(index)) {
            labelProps.optional = (
              <Typography variant="caption">Optional</Typography>
            );
          }
          if (isStepSkipped(index)) {
            stepProps.completed = false;
          }
          return (
            <Step key={ label } { ...stepProps }>
              <StepLabel { ...labelProps } StepIconComponent={ColorlibStepIcon}>{ label }</StepLabel>
            </Step>
          );
        })}
      </Stepper>
    )
  };

  return (
    <Box sx={{ width: '100%', mt: 4 }}>
      <StepperHead />
      {(
        elements[activeStep]
      )}
      {(
        <>
          <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
            <Button
              color="inherit"
              disabled={ activeStep === 0 }
              onClick={ handleBack }
              sx={{ mr: 1 }}
            >
              Atras
            </Button>
            <Box sx={{ flex: '1 1 auto' }} />
            {isStepOptional(activeStep) && (
              <Button color="inherit" onClick={ handleSkip } sx={{ mr: 1 }}>
                Saltar
              </Button>
            )}

            <Button onClick={ activeStep === set.length - 1 ? handleSubmit : handleNext } sx={ activeStep === set.length - 1 ? { backgroundColor: '#ff7801' } : {}} variant={ activeStep === set.length - 1 ? "contained" : ''}>
              {activeStep === set.length - 1 ? 'Dar de alta' : 'Siguiente'}
            </Button>
          </Box>
        </>
      )}
    </Box>
  );
};
