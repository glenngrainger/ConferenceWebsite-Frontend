import moment from "moment";
import { Box, Link, TextField, Typography } from "@mui/material";
import { useSnackbar } from "notistack";
import { forwardRef, useEffect, useImperativeHandle } from "react";
import shallow from "zustand/shallow";
import useOccurrence from "../../../../hooks/useOccurrence";
import { Occurrence } from "../../../../models/Occurrence";
import { ReturnErrorProps } from "../../../../pages/plan/hooks/useErrors";
import useForm from "../../../../pages/plan/hooks/useForm";
import useConferenceModalStore from "../useConferenceModalStore";
import useOccurrenceSectionStore from "./useOccurrenceSectionStore";

export type AddOccurrenceHandle = {
  triggerSave: () => void;
};

type Props = {
  initialValues: any;
};

const dateTimeFormat = "YYYY-MM-DD HH:mm";

const OccurrenceForm = forwardRef<AddOccurrenceHandle, Props>(
  ({ initialValues }, ref) => {
    const { enqueueSnackbar } = useSnackbar();
    const { values, updateValues, clearValues, setAll } = useForm<{}>(
      initialValues
    );
    const occurrenceSection = useOccurrenceSectionStore((state) => ({
      isCurrentlyCreating: state.isCurrentlyCreating,
      occurrence: state.occurrence,
    }));

    const { addOccurrenceMutation, validationErrors } = useOccurrence();

    const selectedConference = useConferenceModalStore(
      (state) => state.conference,
      shallow
    );

    const { setOccurrence } = useOccurrenceSectionStore(
      (state) => ({ setOccurrence: state.setOccurrence }),
      shallow
    );

    useImperativeHandle(ref, () => ({
      async triggerSave() {
        if (occurrenceSection.isCurrentlyCreating) {
          await addOccurrence();
        } else {
          // await updateConference();
        }
      },
    }));

    // If the selected occurence has changed update the form
    useEffect(() => {
      if (occurrenceSection.occurrence !== undefined) {
        // Convert utc to local datetime
        let selectedOccurrenceDetails = {
          ...occurrenceSection.occurrence,
          ...getDateTimeSeparateValues(occurrenceSection.occurrence.dateTime),
        };
        setAll(selectedOccurrenceDetails);
      } else {
        setAll({});
      }
    }, [occurrenceSection.occurrence]);

    const addOccurrence = async () => {
      let result = undefined;
      if (selectedConference !== undefined) {
        // Format the date/time to utc format
        if (validateDateTime()) {
          const data = {
            ...values,
            dateTime: getUtcDateTime() as any,
            conferenceId: selectedConference?.id,
          } as Occurrence;
          result = await addOccurrenceMutation.mutateAsync(data);
        }
      }
      if (result !== undefined) {
        setOccurrence(result);
        setAll(result);
      }
    };

    const validateDateTime = function () {
      const date = values["date"];
      const time = values["time"];
      if (!date || !time) {
        enqueueSnackbar("Date and time must be provided", { variant: "error" });
        return false;
      }

      const dateTime = `${date} ${time}`;

      // Is the date in the future?
      if (moment(dateTime, dateTimeFormat).isBefore()) {
        enqueueSnackbar("Date and time must be in the future", {
          variant: "error",
        });
        return false;
      }

      return true;
    };

    const getUtcDateTime = function () {
      const dateTime = `${values["date"]} ${values["time"]}`;
      return moment(dateTime, dateTimeFormat).utc().format("YYYY-MM-DDTHH:mm");
    };

    const getDateTimeSeparateValues = function (dateTime: Date) {
      const date = moment
        .utc(dateTime, dateTimeFormat)
        .local()
        .format("YYYY-MM-DD");
      const time = moment.utc(dateTime, dateTimeFormat).local().format("HH:mm");
      return { date, time };
    };

    return (
      <Box component="form">
        <Box sx={{ display: { xs: "block", md: "flex", gap: 6 } }}>
          <TextField
            value={values["date"] || ""}
            autoFocus
            margin="dense"
            id="name"
            // label="Date"
            type="date"
            fullWidth
            variant="standard"
            onChange={(e) => updateValues("date", e.target.value)}
            {...ReturnErrorProps("DateTime", validationErrors.validationErrors)}
          />
          <TextField
            value={values["time"] || ""}
            autoFocus
            margin="dense"
            id="name"
            // label="Time"
            type="time"
            fullWidth
            variant="standard"
            onChange={(e) => updateValues("time", e.target.value)}
            {...ReturnErrorProps("DateTime", validationErrors.validationErrors)}
          />
        </Box>
        <TextField
          value={values["duration"] || ""}
          margin="dense"
          id="filled-number"
          label="Duration"
          type="number"
          fullWidth
          variant="standard"
          onChange={(e) => updateValues("duration", e.target.value)}
          {...ReturnErrorProps("Duration", validationErrors.validationErrors)}
        />
        {!occurrenceSection.isCurrentlyCreating && (
          <>
            <Typography variant="body1" sx={{ my: 2 }}>
              Admin Url
            </Typography>
            <Link sx={{ cursor: "pointer" }}>Test Admin Url</Link>
            <Typography variant="body1" sx={{ my: 2 }}>
              Standard Url
            </Typography>
            <Link sx={{ cursor: "pointer" }}>Test Standard Url</Link>
          </>
        )}
      </Box>
    );
  }
);

export default OccurrenceForm;
