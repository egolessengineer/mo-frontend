import {
  Document,
  Page,
  StyleSheet,
  Text,
  View
} from "@react-pdf/renderer";
import moment from "moment";

const styles = StyleSheet.create({
  page: {
    backgroundColor: "white",
    padding: 20,
  },
  section: {
    margin: 10,
    padding: 10,
    flexDirection: "row",
    gap: "20px",
    flexWrap: "wrap",
    fontSize: "10px",
    textTransform: "capitalize",
  },
  sectionCol: {
    flexDirection: "column",
    color: "black",
    gap: "5px",
    flexBasis: "30%",
  },
  sectionText: {
    color: "#757575",
  },
  mainheading:{
    textAlign: "center",
    fontSize: 20,
    fontWeight: 500,
    textTransform: "uppercase",
    marginTop: 20,
    marginBottom : 20,
  },
  heading: {
    color: "#3498db",
    fontWeight: "extrabold",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});

export const PdfCreateAndDownload = ({details}:any) => {
  return (
      <Document>
        <Page size="A4" style={styles.page}>
           <Text style={styles.mainheading}>Dispute Details</Text> 
          <View style={styles.heading}>
            <Text>Project details</Text>
          </View>
          <View style={styles.section}>
            <View style={styles.sectionCol}>
              <Text>Project Name</Text>
              <Text style={styles.sectionText}>{details?.Project?.ProjectDetails?.title || details?.projectName}</Text>
            </View>
            <View style={styles.sectionCol}>
              <Text>Project fund</Text>
              <Text style={styles.sectionText}>{details?.Project?.ProjectDetails?.totalProjectFund || details?.projectFund}</Text>
            </View>
            <View style={styles.sectionCol}>
              <Text>Project duration</Text>
              <Text style={styles.sectionText}>{details?.Project?.ProjectDetails?.duration || details?.projectDuration}{' '}{details?.Project?.ProjectDetails?.durationType || ""}</Text>
            </View>
            <View style={styles.sectionCol}>
              <Text>Project number</Text>
              <Text style={styles.sectionText}>{details?.id}</Text>
            </View>
            <View style={styles.sectionCol}>
              <Text>raised by</Text>
              <Text style={styles.sectionText}>{details?.RaisedBy?.User?.name}</Text>
            </View>
            <View style={styles.sectionCol}>
              <Text>raised on</Text>
              <Text style={styles.sectionText}>{moment
                        .unix(details?.createdAt)
                        .format("DD MMM YYYY hh:mm a")}</Text>
            </View>
            <View style={styles.sectionCol}>
              <Text>nature of dispute</Text>
              <Text style={styles.sectionText}>{details?.disputeNature}</Text>
            </View>
          </View>
          <View style={styles.heading}>
            <Text>Participants Involved</Text>
          </View>
          <View style={styles.section}>
            <View style={styles.sectionCol}>
              <Text>Purchaser</Text>
              <Text style={styles.sectionText}>{details?.RaisedBy?.projectUsers === "PURCHASER"? details?.RaisedBy?.User?.name : details?.RaisedTo?.User?.name }</Text>
            </View>
            <View style={styles.sectionCol}>
              <Text>Provider</Text>
              <Text style={styles.sectionText}>-</Text>
            </View>
            <View style={styles.sectionCol}>
              <Text>List of Individual Provider</Text>
              <Text style={styles.sectionText}>-</Text>
            </View>
          </View>
            <View style={styles.heading}>
              <Text>Dispute Description</Text>
            </View>
            <View style={styles.section}>
            <View style={styles.sectionCol}>
              <Text>Rejolut Technologies</Text>
              <Text style={styles.sectionText}>{details?.disputeDescription}</Text>
            </View>           
          </View>
        </Page>
      </Document>
  );
};
