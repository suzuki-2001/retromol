export interface ProteinData {
  name: string;
  pdbId: string;
  description: string;
  residueCount: number;
  category: 'enzyme' | 'structural' | 'binding' | 'transport';
}

export const SAMPLE_PROTEINS: ProteinData[] = [
  // ============================================================
  // === ENZYMES (75 total) ===
  // ============================================================

  // Hydrolases
  { name: 'Lysozyme', pdbId: '1LYZ', description: 'Antibacterial enzyme', residueCount: 129, category: 'enzyme' },
  { name: 'T4 Lysozyme', pdbId: '2LZM', description: 'Bacteriophage enzyme', residueCount: 164, category: 'enzyme' },
  { name: 'Ribonuclease A', pdbId: '7RSA', description: 'RNA-cleaving enzyme', residueCount: 124, category: 'enzyme' },
  { name: 'Chymotrypsin', pdbId: '1CHO', description: 'Serine protease', residueCount: 241, category: 'enzyme' },
  { name: 'Trypsin', pdbId: '1TRN', description: 'Digestive serine protease', residueCount: 224, category: 'enzyme' },
  { name: 'Subtilisin', pdbId: '1CSE', description: 'Bacterial serine protease', residueCount: 274, category: 'enzyme' },
  { name: 'Elastase', pdbId: '1EST', description: 'Serine protease', residueCount: 240, category: 'enzyme' },
  { name: 'Thermolysin', pdbId: '1TLN', description: 'Zinc metalloprotease', residueCount: 316, category: 'enzyme' },
  { name: 'Pepsin', pdbId: '4PEP', description: 'Gastric aspartyl protease', residueCount: 326, category: 'enzyme' },
  { name: 'HIV Protease', pdbId: '1HHP', description: 'Retroviral aspartyl protease', residueCount: 99, category: 'enzyme' },
  { name: 'Papain', pdbId: '9PAP', description: 'Cysteine protease', residueCount: 212, category: 'enzyme' },
  { name: 'Carboxypeptidase A', pdbId: '5CPA', description: 'Zinc metalloexopeptidase', residueCount: 307, category: 'enzyme' },
  { name: 'Thrombin', pdbId: '1PPB', description: 'Blood clotting protease', residueCount: 295, category: 'enzyme' },
  { name: 'Factor Xa', pdbId: '1FAX', description: 'Coagulation protease', residueCount: 254, category: 'enzyme' },
  { name: 'Caspase-3', pdbId: '1PAU', description: 'Apoptosis executioner', residueCount: 277, category: 'enzyme' },

  // Transferases
  { name: 'Adenylate Kinase', pdbId: '4AKE', description: 'ATP phosphorylation enzyme', residueCount: 214, category: 'enzyme' },
  { name: 'Hexokinase', pdbId: '2YHX', description: 'Glucose phosphorylation', residueCount: 457, category: 'enzyme' },
  { name: 'Protein Kinase A', pdbId: '1ATP', description: 'cAMP-dependent kinase', residueCount: 350, category: 'enzyme' },
  { name: 'Src Kinase', pdbId: '2SRC', description: 'Tyrosine kinase', residueCount: 450, category: 'enzyme' },
  { name: 'CDK2', pdbId: '1HCK', description: 'Cell cycle kinase', residueCount: 298, category: 'enzyme' },
  { name: 'MAP Kinase', pdbId: '1ERK', description: 'Signal transduction kinase', residueCount: 360, category: 'enzyme' },
  { name: 'Casein Kinase', pdbId: '1CSN', description: 'Serine/threonine kinase', residueCount: 298, category: 'enzyme' },
  { name: 'Glycogen Synthase', pdbId: '1GWD', description: 'Glucose polymer synthesis', residueCount: 360, category: 'enzyme' },
  { name: 'DNA Polymerase', pdbId: '1KLN', description: 'DNA replication enzyme', residueCount: 544, category: 'enzyme' },
  { name: 'RNA Polymerase', pdbId: '1I6H', description: 'Transcription enzyme', residueCount: 329, category: 'enzyme' },

  // Oxidoreductases
  { name: 'Lactate Dehydrogenase', pdbId: '1LDM', description: 'Metabolic enzyme', residueCount: 329, category: 'enzyme' },
  { name: 'Alcohol Dehydrogenase', pdbId: '1ADH', description: 'NAD-dependent oxidoreductase', residueCount: 374, category: 'enzyme' },
  { name: 'Cytochrome P450', pdbId: '2CPP', description: 'Monooxygenase enzyme', residueCount: 414, category: 'enzyme' },
  { name: 'Catalase', pdbId: '7CAT', description: 'H2O2 decomposition', residueCount: 506, category: 'enzyme' },
  { name: 'Superoxide Dismutase', pdbId: '2SOD', description: 'Antioxidant enzyme', residueCount: 153, category: 'enzyme' },
  { name: 'Thioredoxin', pdbId: '2TRX', description: 'Redox signaling protein', residueCount: 108, category: 'enzyme' },
  { name: 'Glutathione Reductase', pdbId: '3GRS', description: 'Antioxidant enzyme', residueCount: 478, category: 'enzyme' },
  { name: 'Dihydrofolate Reductase', pdbId: '1DHF', description: 'Folate metabolism', residueCount: 162, category: 'enzyme' },
  { name: 'Malate Dehydrogenase', pdbId: '1MLD', description: 'TCA cycle enzyme', residueCount: 333, category: 'enzyme' },
  { name: 'Glyceraldehyde-3P DH', pdbId: '1GAD', description: 'Glycolysis enzyme', residueCount: 333, category: 'enzyme' },

  // Isomerases and others
  { name: 'Triose Isomerase', pdbId: '1TIM', description: 'Classic TIM barrel enzyme', residueCount: 247, category: 'enzyme' },
  { name: 'Phosphoglucose Isomerase', pdbId: '1HOX', description: 'Sugar isomerase', residueCount: 553, category: 'enzyme' },
  { name: 'Proline Isomerase', pdbId: '1CWA', description: 'Peptide bond isomerase', residueCount: 164, category: 'enzyme' },
  { name: 'Barnase', pdbId: '1BNI', description: 'Bacterial ribonuclease', residueCount: 110, category: 'enzyme' },
  { name: 'Ribonuclease T1', pdbId: '1RNT', description: 'Fungal ribonuclease', residueCount: 104, category: 'enzyme' },
  { name: 'Phosphofructokinase', pdbId: '1PFK', description: 'Glycolysis regulator', residueCount: 320, category: 'enzyme' },
  { name: 'Carbonic Anhydrase', pdbId: '1CA2', description: 'CO2 hydration enzyme', residueCount: 260, category: 'enzyme' },
  { name: 'Xylanase', pdbId: '1XNB', description: 'Carbohydrate hydrolase', residueCount: 185, category: 'enzyme' },
  { name: 'Cellulase', pdbId: '1CEL', description: 'Cellulose hydrolase', residueCount: 363, category: 'enzyme' },
  { name: 'Beta-Galactosidase', pdbId: '1BGL', description: 'Lactose hydrolase', residueCount: 1023, category: 'enzyme' },

  // Ligases and Lyases
  { name: 'DNA Ligase', pdbId: '1A0I', description: 'DNA repair enzyme', residueCount: 671, category: 'enzyme' },
  { name: 'Glutamine Synthetase', pdbId: '1FPY', description: 'Amino acid synthesis', residueCount: 468, category: 'enzyme' },
  { name: 'Pyruvate Carboxylase', pdbId: '1PYC', description: 'Gluconeogenesis enzyme', residueCount: 1178, category: 'enzyme' },
  { name: 'Aldolase', pdbId: '1ADO', description: 'Glycolysis aldolase', residueCount: 363, category: 'enzyme' },
  { name: 'Enolase', pdbId: '1EBG', description: 'Glycolysis enzyme', residueCount: 436, category: 'enzyme' },
  { name: 'Fumarase', pdbId: '1FUO', description: 'TCA cycle enzyme', residueCount: 467, category: 'enzyme' },
  { name: 'Aconitase', pdbId: '1ACO', description: 'TCA cycle enzyme', residueCount: 754, category: 'enzyme' },
  { name: 'Citrate Synthase', pdbId: '1CTS', description: 'TCA cycle enzyme', residueCount: 437, category: 'enzyme' },
  { name: 'Isocitrate DH', pdbId: '1IDE', description: 'TCA cycle enzyme', residueCount: 416, category: 'enzyme' },
  { name: 'Pyruvate Kinase', pdbId: '1PKN', description: 'Glycolysis enzyme', residueCount: 530, category: 'enzyme' },

  // More enzymes
  { name: 'Acetylcholinesterase', pdbId: '1ACE', description: 'Neurotransmitter hydrolase', residueCount: 537, category: 'enzyme' },
  { name: 'Phospholipase A2', pdbId: '1BP2', description: 'Lipid hydrolase', residueCount: 123, category: 'enzyme' },
  { name: 'Lipase', pdbId: '1LPB', description: 'Fat hydrolase', residueCount: 449, category: 'enzyme' },
  { name: 'Urease', pdbId: '1FWJ', description: 'Urea hydrolase', residueCount: 840, category: 'enzyme' },
  { name: 'Arginase', pdbId: '1RLA', description: 'Urea cycle enzyme', residueCount: 322, category: 'enzyme' },
  { name: 'Tyrosinase', pdbId: '1WX2', description: 'Melanin synthesis', residueCount: 391, category: 'enzyme' },
  { name: 'Laccase', pdbId: '1GYC', description: 'Copper oxidase', residueCount: 499, category: 'enzyme' },
  { name: 'Peroxidase', pdbId: '1ATJ', description: 'H2O2 oxidation', residueCount: 306, category: 'enzyme' },
  { name: 'Nitric Oxide Synthase', pdbId: '1NOD', description: 'NO production enzyme', residueCount: 428, category: 'enzyme' },
  { name: 'Cyclooxygenase', pdbId: '1CQE', description: 'Prostaglandin synthesis', residueCount: 551, category: 'enzyme' },
  { name: 'Lipoxygenase', pdbId: '1LOX', description: 'Lipid oxidation', residueCount: 839, category: 'enzyme' },
  { name: 'Xanthine Oxidase', pdbId: '1FIQ', description: 'Purine catabolism', residueCount: 1332, category: 'enzyme' },
  { name: 'Monoamine Oxidase', pdbId: '1GOS', description: 'Neurotransmitter metabolism', residueCount: 506, category: 'enzyme' },
  { name: 'Cytochrome c Oxidase', pdbId: '1OCC', description: 'Electron transport chain', residueCount: 514, category: 'enzyme' },
  { name: 'NADH Dehydrogenase', pdbId: '1FDM', description: 'Complex I subunit', residueCount: 203, category: 'enzyme' },

  // ============================================================
  // === TRANSPORT (75 total) ===
  // ============================================================

  // Oxygen carriers
  { name: 'Myoglobin', pdbId: '1MBN', description: 'Oxygen storage helical bundle', residueCount: 153, category: 'transport' },
  { name: 'Hemoglobin', pdbId: '1HHO', description: 'Oxygen transport tetramer', residueCount: 574, category: 'transport' },
  { name: 'Leghemoglobin', pdbId: '1GDJ', description: 'Plant oxygen carrier', residueCount: 153, category: 'transport' },
  { name: 'Neuroglobin', pdbId: '1OJ6', description: 'Brain oxygen carrier', residueCount: 151, category: 'transport' },
  { name: 'Cytoglobin', pdbId: '1URV', description: 'Ubiquitous oxygen carrier', residueCount: 190, category: 'transport' },
  { name: 'Hemocyanin', pdbId: '1HC1', description: 'Invertebrate oxygen carrier', residueCount: 628, category: 'transport' },
  { name: 'Hemerythrin', pdbId: '1HMD', description: 'Marine worm oxygen carrier', residueCount: 118, category: 'transport' },

  // Electron carriers
  { name: 'Cytochrome c', pdbId: '1HRC', description: 'Electron carrier with heme', residueCount: 105, category: 'transport' },
  { name: 'Cytochrome b5', pdbId: '1CYO', description: 'Electron transfer hemoprotein', residueCount: 93, category: 'transport' },
  { name: 'Cytochrome c2', pdbId: '1C2R', description: 'Bacterial electron carrier', residueCount: 116, category: 'transport' },
  { name: 'Flavodoxin', pdbId: '1FLV', description: 'Electron transfer protein', residueCount: 169, category: 'transport' },
  { name: 'Ferredoxin', pdbId: '1FXI', description: 'Iron-sulfur protein', residueCount: 98, category: 'transport' },
  { name: 'Rubredoxin', pdbId: '1IRO', description: 'Iron-sulfur electron carrier', residueCount: 54, category: 'transport' },
  { name: 'Adrenodoxin', pdbId: '1AYF', description: 'Steroid biosynthesis carrier', residueCount: 108, category: 'transport' },
  { name: 'Thioredoxin', pdbId: '1ERT', description: 'Redox carrier', residueCount: 105, category: 'transport' },

  // Blue copper proteins
  { name: 'Azurin', pdbId: '4AZU', description: 'Blue copper protein', residueCount: 128, category: 'transport' },
  { name: 'Plastocyanin', pdbId: '1PLC', description: 'Photosynthetic electron carrier', residueCount: 99, category: 'transport' },
  { name: 'Stellacyanin', pdbId: '1JER', description: 'Plant copper protein', residueCount: 107, category: 'transport' },
  { name: 'Amicyanin', pdbId: '1AAC', description: 'Blue copper electron carrier', residueCount: 105, category: 'transport' },
  { name: 'Rusticyanin', pdbId: '1RCY', description: 'Acidophilic copper protein', residueCount: 155, category: 'transport' },
  { name: 'Pseudoazurin', pdbId: '1PAZ', description: 'Denitrification copper protein', residueCount: 123, category: 'transport' },
  { name: 'Auracyanin', pdbId: '1QHQ', description: 'Green algae copper protein', residueCount: 139, category: 'transport' },

  // Metal transport
  { name: 'Transferrin', pdbId: '1A8E', description: 'Iron transport glycoprotein', residueCount: 679, category: 'transport' },
  { name: 'Lactoferrin', pdbId: '1LFG', description: 'Iron transport protein', residueCount: 691, category: 'transport' },
  { name: 'Ceruloplasmin', pdbId: '1KCW', description: 'Copper transport enzyme', residueCount: 1040, category: 'transport' },
  { name: 'Ferritin', pdbId: '1FHA', description: 'Iron storage protein', residueCount: 174, category: 'transport' },
  { name: 'Metallothionein', pdbId: '4MT2', description: 'Metal binding protein', residueCount: 62, category: 'transport' },
  { name: 'Copper Chaperone', pdbId: '1CC8', description: 'Copper delivery protein', residueCount: 68, category: 'transport' },
  { name: 'Zinc Transporter', pdbId: '1ZNT', description: 'Zinc carrier protein', residueCount: 149, category: 'transport' },

  // Lipid transport
  { name: 'Retinol Binding', pdbId: '1RBP', description: 'Vitamin A carrier beta-barrel', residueCount: 182, category: 'transport' },
  { name: 'Lipocalin', pdbId: '1A3Y', description: 'Small molecule transport', residueCount: 158, category: 'transport' },
  { name: 'Fatty Acid Binding', pdbId: '1HMT', description: 'Lipid transport protein', residueCount: 131, category: 'transport' },
  { name: 'Apolipoprotein A1', pdbId: '1AV1', description: 'HDL component', residueCount: 243, category: 'transport' },
  { name: 'Apolipoprotein E', pdbId: '1GS9', description: 'Lipoprotein transport', residueCount: 191, category: 'transport' },
  { name: 'LDL Receptor', pdbId: '1AJJ', description: 'Cholesterol uptake', residueCount: 292, category: 'transport' },
  { name: 'Sterol Carrier', pdbId: '1IKT', description: 'Sterol transport', residueCount: 123, category: 'transport' },

  // Channels and pores
  { name: 'Aquaporin', pdbId: '1J4N', description: 'Water channel protein', residueCount: 271, category: 'transport' },
  { name: 'Porin', pdbId: '2POR', description: 'Outer membrane channel', residueCount: 301, category: 'transport' },
  { name: 'OmpF', pdbId: '2OMF', description: 'E. coli porin', residueCount: 340, category: 'transport' },
  { name: 'Maltoporin', pdbId: '1MAL', description: 'Sugar-specific porin', residueCount: 421, category: 'transport' },
  { name: 'Alpha-Hemolysin', pdbId: '7AHL', description: 'Pore-forming toxin', residueCount: 293, category: 'transport' },
  { name: 'Gramicidin', pdbId: '1MAG', description: 'Ion channel peptide', residueCount: 15, category: 'transport' },
  { name: 'KcsA', pdbId: '1BL8', description: 'Potassium channel', residueCount: 160, category: 'transport' },
  { name: 'MscL', pdbId: '1MSL', description: 'Mechanosensitive channel', residueCount: 136, category: 'transport' },

  // Periplasmic binding proteins
  { name: 'Maltose Binding', pdbId: '1ANF', description: 'Periplasmic sugar transport', residueCount: 370, category: 'transport' },
  { name: 'Phosphate Binding', pdbId: '1IXH', description: 'Phosphate carrier protein', residueCount: 321, category: 'transport' },
  { name: 'Glutamine Binding', pdbId: '1GGG', description: 'Amino acid transport', residueCount: 226, category: 'transport' },
  { name: 'Histidine Binding', pdbId: '1HSL', description: 'Amino acid binding', residueCount: 238, category: 'transport' },
  { name: 'Leucine Binding', pdbId: '1USG', description: 'Branched-chain AA binding', residueCount: 346, category: 'transport' },
  { name: 'Ribose Binding', pdbId: '1URP', description: 'Sugar binding protein', residueCount: 271, category: 'transport' },
  { name: 'Arabinose Binding', pdbId: '1ABE', description: 'Sugar binding protein', residueCount: 306, category: 'transport' },
  { name: 'Galactose Binding', pdbId: '1GBP', description: 'Sugar binding protein', residueCount: 309, category: 'transport' },
  { name: 'Sulfate Binding', pdbId: '1SBP', description: 'Anion binding protein', residueCount: 310, category: 'transport' },

  // ABC transporters and pumps
  { name: 'ABC Transporter', pdbId: '1B0U', description: 'ATP-binding cassette', residueCount: 257, category: 'transport' },
  { name: 'P-glycoprotein NBD', pdbId: '1MV5', description: 'Drug efflux pump', residueCount: 237, category: 'transport' },
  { name: 'BtuCD', pdbId: '1L7V', description: 'Vitamin B12 transporter', residueCount: 326, category: 'transport' },
  { name: 'Na/K ATPase', pdbId: '1MO7', description: 'Ion pump subunit', residueCount: 263, category: 'transport' },
  { name: 'Ca ATPase', pdbId: '1EUL', description: 'Calcium pump', residueCount: 994, category: 'transport' },
  { name: 'SecA', pdbId: '1M6N', description: 'Protein translocase', residueCount: 831, category: 'transport' },

  // Other transporters
  { name: 'Serum Albumin', pdbId: '1AO6', description: 'Blood transport protein', residueCount: 585, category: 'transport' },
  { name: 'Transthyretin', pdbId: '1DVQ', description: 'Thyroid hormone transport', residueCount: 127, category: 'transport' },
  { name: 'Thyroxine Binding', pdbId: '1ICT', description: 'Hormone binding globulin', residueCount: 395, category: 'transport' },
  { name: 'Sex Hormone Binding', pdbId: '1D2S', description: 'Steroid hormone transport', residueCount: 373, category: 'transport' },
  { name: 'Vitamin D Binding', pdbId: '1KXP', description: 'Vitamin D carrier', residueCount: 458, category: 'transport' },
  { name: 'Folate Binding', pdbId: '1FBP', description: 'Vitamin transport', residueCount: 229, category: 'transport' },
  { name: 'Biotin Carboxyl Carrier', pdbId: '1BDO', description: 'Biotin carrier domain', residueCount: 156, category: 'transport' },
  { name: 'Acyl Carrier Protein', pdbId: '1ACP', description: 'Fatty acid synthesis', residueCount: 77, category: 'transport' },
  { name: 'Phosphatidylcholine TP', pdbId: '1LN1', description: 'Lipid transfer protein', residueCount: 91, category: 'transport' },
  { name: 'Nonspecific Lipid TP', pdbId: '1AUA', description: 'Lipid transfer protein', residueCount: 131, category: 'transport' },
  { name: 'Odorant Binding', pdbId: '1OW4', description: 'Pheromone carrier', residueCount: 142, category: 'transport' },
  { name: 'Major Urinary Protein', pdbId: '1MUP', description: 'Pheromone transport', residueCount: 162, category: 'transport' },

  // ============================================================
  // === BINDING (75 total) ===
  // ============================================================

  // Calcium binding
  { name: 'Calmodulin', pdbId: '1CLL', description: 'Calcium sensor dumbbell shape', residueCount: 148, category: 'binding' },
  { name: 'Calbindin', pdbId: '3ICB', description: 'Calcium binding protein', residueCount: 76, category: 'binding' },
  { name: 'Parvalbumin', pdbId: '1RRO', description: 'Calcium binding muscle protein', residueCount: 108, category: 'binding' },
  { name: 'S100 Protein', pdbId: '1A4P', description: 'Calcium signaling protein', residueCount: 93, category: 'binding' },
  { name: 'Troponin C', pdbId: '1NCX', description: 'Muscle calcium sensor', residueCount: 161, category: 'binding' },
  { name: 'Recoverin', pdbId: '1REC', description: 'Vision calcium sensor', residueCount: 200, category: 'binding' },
  { name: 'Annexin V', pdbId: '1ANX', description: 'Phospholipid binding', residueCount: 320, category: 'binding' },
  { name: 'Annexin XII', pdbId: '1AEI', description: 'Membrane binding protein', residueCount: 316, category: 'binding' },
  { name: 'Calretinin', pdbId: '1RJV', description: 'Neuronal calcium sensor', residueCount: 271, category: 'binding' },
  { name: 'Frequenin', pdbId: '1FPW', description: 'Neuronal calcium sensor', residueCount: 190, category: 'binding' },

  // Immunoglobulins
  { name: 'Immunoglobulin Fab', pdbId: '7FAB', description: 'Antibody Fab fragment', residueCount: 220, category: 'binding' },
  { name: 'IgG Fc', pdbId: '1FC1', description: 'Antibody Fc fragment', residueCount: 221, category: 'binding' },
  { name: 'Nanobody', pdbId: '1MEL', description: 'Single domain antibody', residueCount: 118, category: 'binding' },
  { name: 'ScFv', pdbId: '1FVC', description: 'Single-chain Fv', residueCount: 244, category: 'binding' },
  { name: 'Diabody', pdbId: '1LMK', description: 'Bispecific antibody fragment', residueCount: 238, category: 'binding' },

  // Lectins
  { name: 'Concanavalin A', pdbId: '1CON', description: 'Plant lectin', residueCount: 237, category: 'binding' },
  { name: 'Ricin B', pdbId: '2AAI', description: 'Galactose binding lectin', residueCount: 262, category: 'binding' },
  { name: 'Wheat Germ Agglutinin', pdbId: '2WGC', description: 'GlcNAc binding lectin', residueCount: 171, category: 'binding' },
  { name: 'Peanut Agglutinin', pdbId: '2PEL', description: 'Galactose lectin', residueCount: 236, category: 'binding' },
  { name: 'Galectin-1', pdbId: '1GZW', description: 'Beta-galactoside binding', residueCount: 135, category: 'binding' },
  { name: 'Galectin-3', pdbId: '1A3K', description: 'Galactose binding lectin', residueCount: 143, category: 'binding' },
  { name: 'Mannose Binding', pdbId: '1HUP', description: 'Innate immunity lectin', residueCount: 148, category: 'binding' },
  { name: 'Selectin', pdbId: '1ESL', description: 'Cell adhesion lectin', residueCount: 120, category: 'binding' },

  // Protease inhibitors
  { name: 'BPTI', pdbId: '4PTI', description: 'Protease inhibitor', residueCount: 58, category: 'binding' },
  { name: 'Ovomucoid', pdbId: '1OMU', description: 'Serine protease inhibitor', residueCount: 56, category: 'binding' },
  { name: 'Soybean Trypsin Inh.', pdbId: '1AVU', description: 'Kunitz-type inhibitor', residueCount: 181, category: 'binding' },
  { name: 'Eglin C', pdbId: '1EGL', description: 'Elastase inhibitor', residueCount: 70, category: 'binding' },
  { name: 'Hirudin', pdbId: '1HIC', description: 'Thrombin inhibitor', residueCount: 65, category: 'binding' },
  { name: 'Cystatin', pdbId: '1CEW', description: 'Cysteine protease inhibitor', residueCount: 108, category: 'binding' },
  { name: 'Serpins', pdbId: '1QLP', description: 'Serine protease inhibitor', residueCount: 394, category: 'binding' },
  { name: 'Alpha-1 Antitrypsin', pdbId: '1QMB', description: 'Lung protease inhibitor', residueCount: 394, category: 'binding' },

  // Hormones and growth factors
  { name: 'Insulin', pdbId: '4INS', description: 'Metabolic hormone', residueCount: 51, category: 'binding' },
  { name: 'Glucagon', pdbId: '1GCN', description: 'Peptide hormone', residueCount: 29, category: 'binding' },
  { name: 'EGF', pdbId: '1EGF', description: 'Epidermal growth factor', residueCount: 53, category: 'binding' },
  { name: 'BMP-2', pdbId: '3BMP', description: 'Bone morphogenetic protein', residueCount: 114, category: 'binding' },
  { name: 'Interleukin-8', pdbId: '1IL8', description: 'Chemokine signaling', residueCount: 72, category: 'binding' },
  { name: 'Interleukin-2', pdbId: '1M47', description: 'T-cell growth factor', residueCount: 133, category: 'binding' },
  { name: 'Interleukin-6', pdbId: '1ALU', description: 'Inflammatory cytokine', residueCount: 185, category: 'binding' },
  { name: 'TNF-alpha', pdbId: '1TNF', description: 'Inflammatory cytokine', residueCount: 157, category: 'binding' },
  { name: 'Interferon-gamma', pdbId: '1HIG', description: 'Antiviral cytokine', residueCount: 143, category: 'binding' },
  { name: 'Erythropoietin', pdbId: '1EER', description: 'Red blood cell growth', residueCount: 166, category: 'binding' },
  { name: 'Growth Hormone', pdbId: '1HGU', description: 'Pituitary hormone', residueCount: 191, category: 'binding' },
  { name: 'Prolactin', pdbId: '1N9D', description: 'Lactation hormone', residueCount: 199, category: 'binding' },

  // Signaling domains
  { name: 'Ubiquitin', pdbId: '1UBQ', description: 'Protein degradation tag', residueCount: 76, category: 'binding' },
  { name: 'SH3 Domain', pdbId: '1SHG', description: 'Signaling adapter module', residueCount: 57, category: 'binding' },
  { name: 'SH2 Domain', pdbId: '1SHA', description: 'Phosphotyrosine binding', residueCount: 103, category: 'binding' },
  { name: 'PDZ Domain', pdbId: '1BE9', description: 'C-terminal peptide binding', residueCount: 93, category: 'binding' },
  { name: 'WW Domain', pdbId: '1PIN', description: 'Proline-rich peptide binding', residueCount: 163, category: 'binding' },
  { name: 'PTB Domain', pdbId: '1SHC', description: 'Phosphotyrosine binding', residueCount: 165, category: 'binding' },
  { name: 'PH Domain', pdbId: '1BTK', description: 'Phospholipid binding', residueCount: 169, category: 'binding' },
  { name: 'FYVE Domain', pdbId: '1HYI', description: 'PI3P binding domain', residueCount: 72, category: 'binding' },
  { name: '14-3-3 Protein', pdbId: '1A4O', description: 'Signaling hub protein', residueCount: 232, category: 'binding' },

  // Biotin binding
  { name: 'Streptavidin', pdbId: '1STP', description: 'Biotin binding protein', residueCount: 159, category: 'binding' },
  { name: 'Avidin', pdbId: '1AVD', description: 'Egg white biotin binding', residueCount: 128, category: 'binding' },

  // Other binding proteins
  { name: 'Fibronectin III', pdbId: '1FNF', description: 'ECM adhesion domain', residueCount: 94, category: 'binding' },
  { name: 'Tenascin', pdbId: '1TEN', description: 'ECM binding protein', residueCount: 90, category: 'binding' },
  { name: 'SUMO', pdbId: '1A5R', description: 'Protein modifier', residueCount: 97, category: 'binding' },
  { name: 'NEDD8', pdbId: '1NDD', description: 'Ubiquitin-like modifier', residueCount: 81, category: 'binding' },
  { name: 'Ran GTPase', pdbId: '1BYU', description: 'Nuclear transport regulator', residueCount: 216, category: 'binding' },
  { name: 'Ras', pdbId: '5P21', description: 'Small GTPase signaling', residueCount: 166, category: 'binding' },
  { name: 'Rho GTPase', pdbId: '1A2B', description: 'Cytoskeleton signaling', residueCount: 181, category: 'binding' },
  { name: 'Rab GTPase', pdbId: '1G17', description: 'Vesicle trafficking', residueCount: 174, category: 'binding' },
  { name: 'Arf GTPase', pdbId: '1HUR', description: 'Membrane trafficking', residueCount: 181, category: 'binding' },
  { name: 'Importin-beta', pdbId: '1QGK', description: 'Nuclear import receptor', residueCount: 876, category: 'binding' },
  { name: 'Exportin', pdbId: '1WA5', description: 'Nuclear export receptor', residueCount: 967, category: 'binding' },
  { name: 'Calcineurin', pdbId: '1AUI', description: 'Calcium-dependent phosphatase', residueCount: 339, category: 'binding' },

  // ============================================================
  // === STRUCTURAL (75 total) ===
  // ============================================================

  // Classic model proteins
  { name: 'GFP', pdbId: '1EMA', description: 'Fluorescent beta-barrel from jellyfish', residueCount: 238, category: 'structural' },
  { name: 'Crambin', pdbId: '1CRN', description: 'Tiny plant seed protein', residueCount: 46, category: 'structural' },
  { name: 'Ubiquitin', pdbId: '1UBI', description: 'Protein tag structure', residueCount: 76, category: 'structural' },
  { name: 'Protein G', pdbId: '2GB1', description: 'IgG binding domain', residueCount: 56, category: 'structural' },
  { name: 'Protein L', pdbId: '1HZ6', description: 'Ig light chain binding', residueCount: 78, category: 'structural' },
  { name: 'Protein A', pdbId: '1BDD', description: 'IgG binding domain', residueCount: 60, category: 'structural' },
  { name: 'Barstar', pdbId: '1BTA', description: 'Barnase inhibitor', residueCount: 89, category: 'structural' },
  { name: 'CI2', pdbId: '2CI2', description: 'Chymotrypsin inhibitor 2', residueCount: 83, category: 'structural' },

  // Miniproteins and folding models
  { name: 'Villin HP35', pdbId: '1VII', description: 'Ultrafast folding domain', residueCount: 36, category: 'structural' },
  { name: 'Trp-cage', pdbId: '1L2Y', description: 'Mini-protein fold', residueCount: 20, category: 'structural' },
  { name: 'WW Domain', pdbId: '1E0L', description: 'Fast folder', residueCount: 34, category: 'structural' },
  { name: 'BBA5', pdbId: '1T8J', description: 'Designed mini-protein', residueCount: 23, category: 'structural' },
  { name: 'Chignolin', pdbId: '1UAO', description: 'Minimal beta-hairpin', residueCount: 10, category: 'structural' },
  { name: 'Beta3s', pdbId: '1FSD', description: 'Three-stranded beta sheet', residueCount: 28, category: 'structural' },
  { name: 'Alpha3D', pdbId: '2A3D', description: 'Designed 3-helix bundle', residueCount: 73, category: 'structural' },

  // Domain folds
  { name: 'Cold Shock Protein', pdbId: '1CSP', description: 'RNA chaperone', residueCount: 67, category: 'structural' },
  { name: 'Ribosomal L7/L12', pdbId: '1CTF', description: 'Ribosome component', residueCount: 68, category: 'structural' },
  { name: 'SH2 Domain', pdbId: '1SHB', description: 'Phosphotyrosine binding fold', residueCount: 103, category: 'structural' },
  { name: 'SH3 Domain Src', pdbId: '1SRL', description: 'Tyrosine kinase domain', residueCount: 64, category: 'structural' },
  { name: 'PDZ Domain', pdbId: '1BFE', description: 'C-terminal peptide binding', residueCount: 93, category: 'structural' },
  { name: 'Ankyrin Repeat', pdbId: '1AWC', description: 'Repeat protein scaffold', residueCount: 213, category: 'structural' },
  { name: 'Titin Ig Domain', pdbId: '1TIT', description: 'Muscle structural repeat', residueCount: 89, category: 'structural' },
  { name: 'Fibronectin FnIII', pdbId: '1TTG', description: 'Ig-like fold domain', residueCount: 90, category: 'structural' },

  // DNA/RNA binding
  { name: 'Engrailed HD', pdbId: '1ENH', description: 'Homeodomain fold', residueCount: 54, category: 'structural' },
  { name: 'Lambda Repressor', pdbId: '1LMB', description: 'DNA binding helix-turn-helix', residueCount: 87, category: 'structural' },
  { name: 'Arc Repressor', pdbId: '1ARQ', description: 'Ribbon-helix-helix motif', residueCount: 53, category: 'structural' },
  { name: 'Zinc Finger', pdbId: '1ZNF', description: 'DNA binding motif', residueCount: 25, category: 'structural' },
  { name: 'Zinc Finger C2H2', pdbId: '1ZAA', description: 'Classic zinc finger', residueCount: 29, category: 'structural' },
  { name: 'Helix-Turn-Helix', pdbId: '1LCC', description: 'DNA binding domain', residueCount: 62, category: 'structural' },
  { name: 'Leucine Zipper', pdbId: '2ZTA', description: 'Coiled-coil dimerization', residueCount: 62, category: 'structural' },
  { name: 'bZIP Domain', pdbId: '1YSA', description: 'Basic region leucine zipper', residueCount: 59, category: 'structural' },
  { name: 'HMG Box', pdbId: '1HRY', description: 'DNA bending domain', residueCount: 77, category: 'structural' },

  // Coiled-coils
  { name: 'Tropomyosin', pdbId: '1C1G', description: 'Muscle coiled-coil', residueCount: 284, category: 'structural' },
  { name: 'Spectrin Repeat', pdbId: '1AJ3', description: 'Cytoskeletal domain', residueCount: 106, category: 'structural' },
  { name: 'Keratin', pdbId: '1GK4', description: 'Intermediate filament', residueCount: 183, category: 'structural' },
  { name: 'Vimentin', pdbId: '1GK7', description: 'Intermediate filament', residueCount: 99, category: 'structural' },

  // Immunity proteins
  { name: 'Im7', pdbId: '1AYI', description: 'Immunity protein', residueCount: 87, category: 'structural' },
  { name: 'Im9', pdbId: '1IMQ', description: 'Colicin immunity protein', residueCount: 86, category: 'structural' },
  { name: 'Beta-2 Microglobulin', pdbId: '1LDS', description: 'MHC component', residueCount: 99, category: 'structural' },

  // Beta structures
  { name: 'SH3 Barrel', pdbId: '1AEY', description: 'Five-stranded beta barrel', residueCount: 62, category: 'structural' },
  { name: 'Lipocalin Fold', pdbId: '1BBP', description: 'Eight-stranded beta barrel', residueCount: 173, category: 'structural' },
  { name: 'TIM Barrel', pdbId: '1BTM', description: 'Alpha/beta barrel fold', residueCount: 247, category: 'structural' },
  { name: 'Beta Propeller', pdbId: '1ERJ', description: 'WD40 repeat fold', residueCount: 423, category: 'structural' },
  { name: 'Beta Helix', pdbId: '1DAB', description: 'Parallel beta helix', residueCount: 296, category: 'structural' },
  { name: 'Jelly Roll', pdbId: '1STM', description: 'Viral capsid fold', residueCount: 197, category: 'structural' },

  // Alpha helical
  { name: 'Four Helix Bundle', pdbId: '1ROP', description: 'Rop protein', residueCount: 63, category: 'structural' },
  { name: 'Coiled Coil', pdbId: '2AK3', description: 'Alpha-helical bundle', residueCount: 99, category: 'structural' },
  { name: 'Armadillo Repeat', pdbId: '1EE4', description: 'Alpha-solenoid', residueCount: 514, category: 'structural' },
  { name: 'HEAT Repeat', pdbId: '1B3U', description: 'Alpha-alpha superhelix', residueCount: 410, category: 'structural' },
  { name: 'Tetratricopeptide', pdbId: '1NA0', description: 'TPR repeat', residueCount: 118, category: 'structural' },

  // Toxins and venoms
  { name: 'Scorpion Toxin', pdbId: '1AHO', description: 'Neurotoxin fold', residueCount: 64, category: 'structural' },
  { name: 'Conotoxin', pdbId: '1IMI', description: 'Snail venom peptide', residueCount: 22, category: 'structural' },
  { name: 'Charybdotoxin', pdbId: '2CRD', description: 'K+ channel blocker', residueCount: 37, category: 'structural' },
  { name: 'Bungarotoxin', pdbId: '1IDI', description: 'Snake neurotoxin', residueCount: 74, category: 'structural' },
  { name: 'Cardiotoxin', pdbId: '1CDT', description: 'Snake venom toxin', residueCount: 60, category: 'structural' },
  { name: 'Defensin', pdbId: '1DFN', description: 'Antimicrobial peptide', residueCount: 29, category: 'structural' },
  { name: 'Thionin', pdbId: '1GPS', description: 'Plant defense peptide', residueCount: 45, category: 'structural' },

  // Designed proteins
  { name: 'Top7', pdbId: '1QYS', description: 'Computationally designed', residueCount: 92, category: 'structural' },
  { name: 'Designed Ankyrin', pdbId: '1MJ0', description: 'DARPin', residueCount: 166, category: 'structural' },
  { name: 'Pizza', pdbId: '3NNV', description: 'Designed repeat protein', residueCount: 197, category: 'structural' },

  // Viral
  { name: 'Capsid Protein', pdbId: '2BUK', description: 'Hepatitis B capsid', residueCount: 149, category: 'structural' },
  { name: 'Coat Protein', pdbId: '2MS2', description: 'MS2 bacteriophage', residueCount: 129, category: 'structural' },
  { name: 'Fiber Knob', pdbId: '1KNB', description: 'Adenovirus fiber', residueCount: 181, category: 'structural' },

  // Membrane-associated
  { name: 'Annexin Fold', pdbId: '1W7B', description: 'Calcium-membrane binding', residueCount: 316, category: 'structural' },
  { name: 'C2 Domain', pdbId: '1RSY', description: 'Calcium-dependent lipid binding', residueCount: 123, category: 'structural' },
  { name: 'PX Domain', pdbId: '1H6H', description: 'Phosphoinositide binding', residueCount: 123, category: 'structural' },
  { name: 'BAR Domain', pdbId: '1URU', description: 'Membrane curvature sensor', residueCount: 241, category: 'structural' },
  { name: 'ENTH Domain', pdbId: '1H0A', description: 'Endocytic scaffold', residueCount: 145, category: 'structural' },

  // Miscellaneous
  { name: 'Thioredoxin Fold', pdbId: '1XOA', description: 'Redox active fold', residueCount: 108, category: 'structural' },
  { name: 'Ferredoxin Fold', pdbId: '1FXA', description: 'Alpha-beta sandwich', residueCount: 54, category: 'structural' },
  { name: 'Rossmann Fold', pdbId: '1LDN', description: 'NAD binding domain', residueCount: 329, category: 'structural' },
  { name: 'P-loop NTPase', pdbId: '1GIA', description: 'G-protein fold', residueCount: 353, category: 'structural' },
  { name: 'Green Fluorescent', pdbId: '1GFL', description: 'Enhanced GFP variant', residueCount: 238, category: 'structural' },
  { name: 'mCherry', pdbId: '2H5Q', description: 'Red fluorescent protein', residueCount: 236, category: 'structural' },
  { name: 'dsRed', pdbId: '1G7K', description: 'Tetrameric red fluorescent', residueCount: 225, category: 'structural' },

  // Additional enzymes
  { name: 'Renin', pdbId: '1RNE', description: 'Blood pressure regulation', residueCount: 340, category: 'enzyme' },
  { name: 'Plasmepsin', pdbId: '1PFZ', description: 'Malaria protease', residueCount: 329, category: 'enzyme' },
  { name: 'Asparaginase', pdbId: '3ECA', description: 'Leukemia treatment enzyme', residueCount: 326, category: 'enzyme' },
  { name: 'Penicillin Acylase', pdbId: '1PNK', description: 'Antibiotic synthesis', residueCount: 766, category: 'enzyme' },
  { name: 'Amylase', pdbId: '1PPI', description: 'Starch degradation enzyme', residueCount: 496, category: 'enzyme' },

  // Additional transport
  { name: 'Neurotransmitter TP', pdbId: '2A65', description: 'Dopamine transporter', residueCount: 620, category: 'transport' },
  { name: 'Chloride Channel', pdbId: '1KPL', description: 'Anion channel', residueCount: 473, category: 'transport' },
  { name: 'Sodium Channel', pdbId: '2KAV', description: 'Voltage-gated channel', residueCount: 258, category: 'transport' },
  { name: 'Calcium Channel', pdbId: '1T0J', description: 'Voltage-gated Ca channel', residueCount: 176, category: 'transport' },

  // Additional binding
  { name: 'Thrombopoietin', pdbId: '1V7M', description: 'Platelet growth factor', residueCount: 174, category: 'binding' },
  { name: 'Leptin', pdbId: '1AX8', description: 'Appetite hormone', residueCount: 146, category: 'binding' },
  { name: 'Adiponectin', pdbId: '1C28', description: 'Metabolic hormone', residueCount: 137, category: 'binding' },
  { name: 'Resistin', pdbId: '1RFX', description: 'Adipokine', residueCount: 92, category: 'binding' },
  { name: 'Ghrelin', pdbId: '1P7X', description: 'Hunger hormone', residueCount: 117, category: 'binding' },
  { name: 'Osteocalcin', pdbId: '1Q8H', description: 'Bone metabolism hormone', residueCount: 49, category: 'binding' },
  { name: 'Relaxin', pdbId: '6RLX', description: 'Pregnancy hormone', residueCount: 53, category: 'binding' },
  { name: 'Activin', pdbId: '1NYU', description: 'Growth differentiation factor', residueCount: 116, category: 'binding' },
  { name: 'Inhibin', pdbId: '1S4Y', description: 'FSH regulator', residueCount: 109, category: 'binding' },
];
