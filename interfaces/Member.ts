export interface IMember {
    uuid: string
    name: string
    image?: string
    created_at: string
}

export interface IMemberBasic {
  uuid: string
  name: string
  birthday?: number
}

// type Member = {
//   uuid: string;
//   name: string;
//   externalId: number;
//   nickname: string;
//   gender: string;
//   address: string;
//   number: string;
//   complement: string;
//   neighborhood: string;
//   city: string;
//   state: string;
//   zipCode: string;
//   phoneNumber: string | null;
//   businessPhoneNumber: string | null;
//   cellphoneNumber: string;
//   email: string;
//   birthDate: string;
//   nationality: string;
//   dateBaptism: string;
//   localBaptism: string;
//   baptismShepherd: string;
//   motherName: string;
//   fatherName: string;
//   spouse: string;
//   spouseBirthDate: string;
//   dateSignin: string;
//   observation: string;
//   maritalStatus: string;
//   signinForm: string;
//   congregation: string;
//   verified: boolean;
//   image: string | null; // Assuming image is a base64 string or URL
//   status: string;
//   created_at: string;
// };